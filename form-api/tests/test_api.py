#!/usr/bin/env python3
"""
Test script for the form submission API
"""
import requests
import json

API_URL = "http://localhost:5000"

def test_unauthorized_submission():
    """Test that submissions from unauthorized domains are rejected"""
    print("\n=== Testing Unauthorized Domain ===")
    response = requests.post(
        f"{API_URL}/api/submit",
        json={
            "name": "Test User",
            "email": "test@example.com",
            "phone": "+1234567890",
            "message": "This should be rejected"
        },
        headers={"Origin": "https://unauthorized-domain.com"}
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 403, "Should reject unauthorized domain"
    print("✓ Unauthorized domain correctly rejected")

def test_authorized_submission():
    """Test that submissions from authorized domains are accepted"""
    print("\n=== Testing Authorized Domain ===")
    response = requests.post(
        f"{API_URL}/api/submit",
        json={
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "+1234567890",
            "message": "Hello from improveitmd.com!"
        },
        headers={"Origin": "https://improveitmd.com"}
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 201, "Should accept authorized domain"
    print("✓ Authorized domain correctly accepted")

def test_v2_subdomain():
    """Test that v2 subdomain is accepted"""
    print("\n=== Testing v2 Subdomain ===")
    response = requests.post(
        f"{API_URL}/api/submit",
        json={
            "name": "Jane Smith",
            "email": "jane@example.com",
            "phone": "+0987654321",
            "message": "Hello from v2.improveitmd.com!",
            "custom_field": "This is additional data"
        },
        headers={"Origin": "https://v2.improveitmd.com"}
    )
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.json()}")
    assert response.status_code == 201, "Should accept v2 subdomain"
    print("✓ v2 subdomain correctly accepted")

def test_get_submissions():
    """Test retrieving all submissions"""
    print("\n=== Testing Get All Submissions ===")
    response = requests.get(f"{API_URL}/api/submissions")
    print(f"Status Code: {response.status_code}")
    submissions = response.json()
    print(f"Total Submissions: {len(submissions)}")
    if submissions:
        print(f"Latest submission: {submissions[0]}")
    assert response.status_code == 200, "Should retrieve submissions"
    print("✓ Successfully retrieved submissions")

def main():
    print("Starting Form Submission API Tests...")
    print(f"API URL: {API_URL}")

    try:
        # Test unauthorized domain (should fail)
        test_unauthorized_submission()

        # Test authorized domains (should succeed)
        test_authorized_submission()
        test_v2_subdomain()

        # Test retrieving submissions
        test_get_submissions()

        print("\n" + "=" * 50)
        print("✓ All tests passed successfully!")
        print("=" * 50)
        print(f"\nView the dashboard at: {API_URL}/dashboard")

    except AssertionError as e:
        print(f"\n✗ Test failed: {e}")
    except requests.exceptions.ConnectionError:
        print("\n✗ Could not connect to the API. Make sure the server is running:")
        print("  python3 form_submission_app.py")
    except Exception as e:
        print(f"\n✗ Unexpected error: {e}")

if __name__ == "__main__":
    main()
