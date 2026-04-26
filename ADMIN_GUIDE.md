# 🛡️ Elyvo Admin & Content Management Guide

This guide explains how to manage the problem library, add new coding challenges, and configure administrative access for multiple team members.

---

## 🔑 Administrative Access

Elyvo supports two ways to authenticate as an admin:

### 1. Global Admin Secret (For Postman/API)
Use a shared secret key in your request headers. This is ideal for bulk imports or automated scripts.
*   **Header**: `x-admin-secret`
*   **Value**: Set in `backend/.env` under `ADMIN_SECRET` (Current default: `elyvo_admin_secret_2026`).

### 2. User-Based Admin IDs (For Multiple People)
You can grant admin privileges to specific users based on their **Clerk ID**. This allows them to use admin-protected routes while being logged into the application.
*   **How to add**: In `backend/.env`, add their Clerk ID to the `ADMIN_IDS` variable (comma-separated).
*   **Example**: `ADMIN_IDS=user_2qDxxx,user_3xYyyy`

---

## 🚀 Managing Problems via Postman

### **Base URL**: `http://localhost:5001/api/admin/problems`

### 📤 1. Add a New Problem
**Method**: `POST`  
**Required Header**: `x-admin-secret: your_secret_here`  
**Body (JSON)**:
```json
{
  "id": "two-sum",
  "title": "Two Sum",
  "difficulty": "Easy",
  "category": "Array",
  "description": "Markdown text describing the problem...",
  "constraints": ["2 <= nums.length <= 10^4"],
  "starterCode": {
    "javascript": "function twoSum(nums, target) {\n\n}",
    "python": "class Solution:\n    def twoSum(self, nums, target):"
  },
  "testCases": [
    { "input": [4, [2, 7, 11, 15], 9], "output": "0 1" }
  ]
}
```

### 🔄 2. Update a Problem
**Method**: `PUT`  
**URL**: `http://localhost:5001/api/admin/problems/:id`  
**Body**: Include only the fields you wish to change.

### 🗑️ 3. Delete a Problem
**Method**: `DELETE`  
**URL**: `http://localhost:5001/api/admin/problems/:id`

---

## 📝 Problem Schema Reference
| Field | Type | Description |
| :--- | :--- | :--- |
| `id` | String | Unique slug (e.g. `palindrome-number`) |
| `title` | String | Display name |
| `difficulty`| Enum | `Easy`, `Medium`, or `Hard` |
| `category` | String | e.g. `Array`, `Tree`, `Graph` |
| `description`| String | Problem details (supports Markdown) |
| `starterCode`| Object | Keys: `javascript`, `python`, `cpp`, `java`, `c` |
| `testCases` | Array | Objects with `input` and `output` |

---

## 💡 Pro Tip
To find your Clerk ID for `ADMIN_IDS`, log into Elyvo and check the **Console** in your browser's Developer Tools (F12). The app logs your user information on the dashboard!
