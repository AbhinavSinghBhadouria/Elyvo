
// Data/problems.js - Sample problems for seeding database
export default [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    videoId: "8-k1C6ehKuw",
    description: `Given an array of integers \`nums\` and an integer \`target\`, return indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

## Approach & Strategy
This is a classic problem that can be solved efficiently using a Hash Map (or dictionary). The key insight is to store each number we've seen along with its index as we iterate through the array.

### Key Points:
- **Time Complexity**: O(n) - we make only one pass through the array
- **Space Complexity**: O(n) - we store up to n elements in the hash map
- **Pattern**: Hash Table/Map for lookup optimization`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,7,11,15], target = 9",
        outputText: "[0,1]",
        explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        id: 2,
        inputText: "nums = [3,2,4], target = 6",
        outputText: "[1,2]",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6, so we return [1, 2]."
      }
    ],
    starterCode: {
      javascript: `function twoSum(nums, target) {
  // Write your code here
};`,
      cpp: `#include <vector>
class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // Example: vector<int> nums = {2,7,11,15};
        // int target = 9;
        
    }
};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        `,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`
    },
    handlerFunction: "twoSum",
    expectedOutput: {
      javascript: "[0,1]",
      python: "[0,1]",
      java: "[0,1]",
      cpp: "[0,1]",
      c: "[0,1]"
    },
    modifiedParameterIndex: null,
    testCases: [
      { input: [[2,7,11,15], 9], output: [0,1] },
      { input: [[3,2,4], 6], output: [1,2] },
      { input: [[3,3], 6], output: [0,1] }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    hints: [
      "A really brute force way would be to search for all possible pairs of numbers",
      "So, if we fix one of the numbers, say x, we have to scan the entire array to find the next number y which is value - x",
      "Can we change our array somehow so that this search becomes faster?"
    ],
    tags: ["Array", "Hash Table"]
  },

  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String",
    order: 2,
    videoId: "",
    description: `Write a function that reverses a string. The input string is given as an array of characters \`s\`.

You must do this by modifying the input array **in-place** with O(1) extra memory.

## Approach & Strategy
This is a classic two-pointer problem that demonstrates the efficiency of the two-pointer technique. We use one pointer at the beginning and one at the end of the array, swapping elements until we meet in the middle.

### Key Points:
- **Time Complexity**: O(n/2) = O(n) - we process roughly half the array
- **Space Complexity**: O(1) - only using two pointers, no extra space
- **Pattern**: Two Pointers technique for in-place modification
- **Important**: Must modify the original array, not return a new one

### Two-Pointer Pattern:
1. Initialize left pointer at start, right pointer at end
2. While left < right:
   - Swap elements at left and right positions
   - Move left pointer right, right pointer left`,
    examples: [
      {
        id: 1,
        inputText: 's = ["h","e","l","l","o"]',
        outputText: '["o","l","l","e","h"]',
        explanation: "The array is reversed in-place: h→o, e→l, l→l, l→e, o→h"
      },
      {
        id: 2,
        inputText: 's = ["H","a","n","n","a","h"]',
        outputText: '["h","a","n","n","a","H"]',
        explanation: "Capital and lowercase letters are preserved during reversal"
      }
    ],
    starterCode: {
      javascript: `function reverseString(s) {
  // Write your code here
};`,
      cpp: `#include <vector>
#include <algorithm>
class Solution {
public:
    void reverseString(vector<char>& s) {
        // Example: vector<char> s = {'h', 'e', 'l', 'l', 'o'};
        
    }
};`,
      c: `void reverseString(char* s, int sSize) {
    
}`,
      python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        `,
      java: `class Solution {
    public void reverseString(char[] s) {
        
    }
}`
    },
    handlerFunction: "reverseString",
    expectedOutput: {
      javascript: '["o","l","l","e","h"]',
      python: "['o','l','l','e','h']",
      java: "[o, l, l, e, h]",
      cpp: "[o,l,l,e,h]",
      c: "[o,l,l,e,h]"
    },
    modifiedParameterIndex: 0,
    testCases: [
      { input: [["h","e","l","l","o"]], output: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], output: ["h","a","n","n","a","H"] }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character."
    ],
    hints: [
      "The entire logic for reversing a string is based on using the opposite directional two-pointer approach!"
    ],
    tags: ["String", "Two Pointers"]
  },

  {
    id: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    order: 3,
    videoId: "",
    description: `Given an integer \`x\`, return \`true\` if \`x\` is a **palindrome**, and \`false\` otherwise.

## Approach & Strategy
This problem can be solved by reversing the number and comparing it with the original. However, we must be careful about negative numbers (they can never be palindromes) and integer overflow when reversing.

### Key Points:
- **Time Complexity**: O(log n) - we process about half the digits
- **Space Complexity**: O(1) - only using a few variables
- **Pattern**: Mathematical manipulation with digit reversal
- **Edge Cases**: Negative numbers, single digits, leading zeros

### Important Considerations:
1. **Negative Numbers**: All negative numbers are not palindromes (they start with -)
2. **Single Digits**: All single-digit numbers are palindromes
3. **No String Conversion**: Try to solve without converting to string for better performance`,
    examples: [
      {
        id: 1,
        inputText: "x = 121",
        outputText: "true",
        explanation: "121 reads as 121 from left to right and from right to left - it's a palindrome."
      },
      {
        id: 2,
        inputText: "x = -121",
        outputText: "false",
        explanation: "From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome."
      },
      {
        id: 3,
        inputText: "x = 10",
        outputText: "false",
        explanation: "10 reads as 01 from right to left, which is different from 10."
      }
    ],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        // Example: int x = 121;
        
    }
};`,
      c: `bool isPalindrome(int x) {
    
}`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        `,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        
    }
}`
    },
    handlerFunction: "isPalindrome",
    expectedOutput: {
      javascript: "true",
      python: "True",
      java: "true",
      cpp: "1",
      c: "1"
    },
    modifiedParameterIndex: null,
    testCases: [
      { input: [121], output: true },
      { input: [-121], output: false },
      { input: [10], output: false }
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1"
    ],
    hints: [
      "Beware of overflow when you reverse the integer."
    ],
    tags: ["Math"]
  }
];

