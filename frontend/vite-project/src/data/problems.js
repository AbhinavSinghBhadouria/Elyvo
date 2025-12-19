export const problems = [
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
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    
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
    testCases: [
      { input: [[2,7,11,15], 9], expected: [0,1] },
      { input: [[3,2,4], 6], expected: [1,2] },
      { input: [[3,3], 6], expected: [0,1] }
    ]
  },

  // 2. Reverse String
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
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Write your code here
};`,
      cpp: `#include <vector>
#include <algorithm>
class Solution {
public:
    void reverseString(vector<char>& s) {
        
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
    testCases: [
      { input: [["h","e","l","l","o"]], expected: ["o","l","l","e","h"] },
      { input: [["H","a","n","n","a","h"]], expected: ["h","a","n","n","a","H"] }
    ]
  },

  // 3. Palindrome Number
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
    testCases: [
      { input: [121], expected: true },
      { input: [-121], expected: false },
      { input: [10], expected: false }
    ]
  },

  // 4. Valid Parentheses
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 4,
    videoId: "",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      {
        id: 1,
        inputText: 's = "()"',
        outputText: "true",
        explanation: ""
      },
      {
        id: 2,
        inputText: 's = "()[]{}"',
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your code here
};`,
      cpp: `#include <string>
#include <stack>
class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
      c: `bool isValid(char* s) {
    
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`
    },
    handlerFunction: "isValid",
    testCases: [
      { input: ["()"], expected: true },
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false },
      { input: ["([)]"], expected: false },
      { input: ["{[]}"], expected: true }
    ]
  },

  // 5. Best Time to Buy and Sell Stock
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 5,
    videoId: "",
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.`,
    examples: [
      {
        id: 1,
        inputText: "prices = [7,1,5,3,6,4]",
        outputText: "5",
        explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5."
      }
    ],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`,
      c: `int maxProfit(int* prices, int pricesSize) {
    
}`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`
    },
    handlerFunction: "maxProfit",
    testCases: [
      { input: [[7,1,5,3,6,4]], expected: 5 },
      { input: [[7,6,4,3,1]], expected: 0 }
    ]
  },

  // 6. Valid Palindrome
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String",
    order: 6,
    videoId: "",
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.`,
    examples: [
      {
        id: 1,
        inputText: 's = "A man, a plan, a canal: Panama"',
        outputText: "true",
        explanation: '"amanaplanacanalpanama" is a palindrome.'
      }
    ],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`,
      c: `bool isPalindrome(char* s) {
    
}`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        
    }
}`
    },
    handlerFunction: "isPalindrome",
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expected: true },
      { input: ["race a car"], expected: false },
      { input: [" "], expected: true }
    ]
  },

  // 7. Valid Anagram
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String",
    order: 7,
    videoId: "",
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.`,
    examples: [
      {
        id: 1,
        inputText: 's = "anagram", t = "nagaram"',
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`,
      c: `bool isAnagram(char* s, char* t) {
    
}`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        `,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        
    }
}`
    },
    handlerFunction: "isAnagram",
    testCases: [
      { input: ["anagram", "nagaram"], expected: true },
      { input: ["rat", "car"], expected: false }
    ]
  },

  // 8. Binary Search
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    order: 8,
    videoId: "",
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [-1,0,3,5,9,12], target = 9",
        outputText: "4",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    
}`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        `,
      java: `class Solution {
    public int search(int[] nums, int target) {
        
    }
}`
    },
    handlerFunction: "search",
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expected: 4 },
      { input: [[-1,0,3,5,9,12], 2], expected: -1 }
    ]
  },

  // 9. Climbing Stairs
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "DP",
    order: 9,
    videoId: "",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        id: 1,
        inputText: "n = 2",
        outputText: "2",
        explanation: "1. 1 step + 1 step\n2. 2 steps"
      }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
      c: `int climbStairs(int n) {
    
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        `,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`
    },
    handlerFunction: "climbStairs",
    testCases: [
      { input: [2], expected: 2 },
      { input: [3], expected: 3 },
      { input: [5], expected: 8 }
    ]
  },

  // 10. Contains Duplicate
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array",
    order: 10,
    videoId: "",
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,3,1]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        
    }
};`,
      c: `bool containsDuplicate(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        `,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        
    }
}`
    },
    handlerFunction: "containsDuplicate",
    testCases: [
      { input: [[1,2,3,1]], expected: true },
      { input: [[1,2,3,4]], expected: false },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expected: true }
    ]
  },

  // 11. Single Number
  {
    id: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 11,
    videoId: "",
    description: `Given a non-empty array of integers \`nums\`, every element appears twice except for one. Find that single one.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,2,1]",
        outputText: "1",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function singleNumber(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int singleNumber(vector<int>& nums) {
        
    }
};`,
      c: `int singleNumber(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int singleNumber(int[] nums) {
        
    }
}`
    },
    handlerFunction: "singleNumber",
    testCases: [
      { input: [[2,2,1]], expected: 1 },
      { input: [[4,1,2,1,2]], expected: 4 },
      { input: [[1]], expected: 1 }
    ]
  },

  // 12. Majority Element
  {
    id: "majority-element",
    title: "Majority Element",
    difficulty: "Easy",
    category: "Array",
    order: 12,
    videoId: "",
    description: `Given an array \`nums\` of size \`n\`, return the majority element. The majority element is the element that appears more than \`⌊n / 2⌋\` times.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [3,2,3]",
        outputText: "3",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function majorityElement(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int majorityElement(vector<int>& nums) {
        
    }
};`,
      c: `int majorityElement(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int majorityElement(int[] nums) {
        
    }
}`
    },
    handlerFunction: "majorityElement",
    testCases: [
      { input: [[3,2,3]], expected: 3 },
      { input: [[2,2,1,1,1,2,2]], expected: 2 }
    ]
  },

  // 13. Move Zeroes
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "Two Pointers",
    order: 13,
    videoId: "",
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [0,1,0,3,12]",
        outputText: "[1,3,12,0,0]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
function moveZeroes(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        
    }
};`,
      c: `void moveZeroes(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def moveZeroes(self, nums: List[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        `,
      java: `class Solution {
    public void moveZeroes(int[] nums) {
        
    }
}`
    },
    handlerFunction: "moveZeroes",
    testCases: [
      { input: [[0,1,0,3,12]], expected: [1,3,12,0,0] },
      { input: [[0]], expected: [0] }
    ]
  },

  // 14. Missing Number
  {
    id: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "Array",
    order: 14,
    videoId: "",
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [3,0,1]",
        outputText: "2",
        explanation: "n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 2 is the missing number."
      }
    ],
    starterCode: {
      javascript: `function missingNumber(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int missingNumber(vector<int>& nums) {
        
    }
};`,
      c: `int missingNumber(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def missingNumber(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int missingNumber(int[] nums) {
        
    }
}`
    },
    handlerFunction: "missingNumber",
    testCases: [
      { input: [[3,0,1]], expected: 2 },
      { input: [[0,1]], expected: 2 },
      { input: [[9,6,4,2,3,5,7,0,1]], expected: 8 }
    ]
  },

  // 15. Intersection of Two Arrays
  {
    id: "intersection-of-two-arrays",
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    category: "Array",
    order: 15,
    videoId: "",
    description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.`,
    examples: [
      {
        id: 1,
        inputText: "nums1 = [1,2,2,1], nums2 = [2,2]",
        outputText: "[2]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function intersection(nums1, nums2) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {
    
}`,
      python: `class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        `,
      java: `class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        
    }
}`
    },
    handlerFunction: "intersection",
    testCases: [
      { input: [[1,2,2,1], [2,2]], expected: [2] },
      { input: [[4,9,5], [9,4,9,8,4]], expected: [9,4] }
    ]
  },

  // 16. First Unique Character in a String
  {
    id: "first-unique-character",
    title: "First Unique Character in a String",
    difficulty: "Easy",
    category: "String",
    order: 16,
    videoId: "",
    description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return -1.`,
    examples: [
      {
        id: 1,
        inputText: 's = "leetcode"',
        outputText: "0",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function firstUniqChar(s) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int firstUniqChar(string s) {
        
    }
};`,
      c: `int firstUniqChar(char* s) {
    
}`,
      python: `class Solution:
    def firstUniqChar(self, s: str) -> int:
        `,
      java: `class Solution {
    public int firstUniqChar(String s) {
        
    }
}`
    },
    handlerFunction: "firstUniqChar",
    testCases: [
      { input: ["leetcode"], expected: 0 },
      { input: ["loveleetcode"], expected: 2 },
      { input: ["aabb"], expected: -1 }
    ]
  },

  // 17. Fibonacci Number
  {
    id: "fibonacci-number",
    title: "Fibonacci Number",
    difficulty: "Easy",
    category: "DP",
    order: 17,
    videoId: "",
    description: `The Fibonacci numbers, commonly denoted F(n) form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.`,
    examples: [
      {
        id: 1,
        inputText: "n = 2",
        outputText: "1",
        explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1."
      }
    ],
    starterCode: {
      javascript: `function fib(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int fib(int n) {
        
    }
};`,
      c: `int fib(int n) {
    
}`,
      python: `class Solution:
    def fib(self, n: int) -> int:
        `,
      java: `class Solution {
    public int fib(int n) {
        
    }
}`
    },
    handlerFunction: "fib",
    testCases: [
      { input: [2], expected: 1 },
      { input: [3], expected: 2 },
      { input: [4], expected: 3 }
    ]
  },

  // 18. Power of Two
  {
    id: "power-of-two",
    title: "Power of Two",
    difficulty: "Easy",
    category: "Math",
    order: 18,
    videoId: "",
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.`,
    examples: [
      {
        id: 1,
        inputText: "n = 1",
        outputText: "true",
        explanation: "2^0 = 1"
      }
    ],
    starterCode: {
      javascript: `function isPowerOfTwo(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isPowerOfTwo(int n) {
        
    }
};`,
      c: `bool isPowerOfTwo(int n) {
    
}`,
      python: `class Solution:
    def isPowerOfTwo(self, n: int) -> bool:
        `,
      java: `class Solution {
    public boolean isPowerOfTwo(int n) {
        
    }
}`
    },
    handlerFunction: "isPowerOfTwo",
    testCases: [
      { input: [1], expected: true },
      { input: [16], expected: true },
      { input: [3], expected: false }
    ]
  },

  // 19. Happy Number
  {
    id: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    category: "Math",
    order: 19,
    videoId: "",
    description: `Write an algorithm to determine if a number \`n\` is happy.
    
A happy number is a number defined by the following process:
1. Starting with any positive integer, replace the number by the sum of the squares of its digits.
2. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
3. Those numbers for which this process ends in 1 are happy.`,
    examples: [
      {
        id: 1,
        inputText: "n = 19",
        outputText: "true",
        explanation: "1^2 + 9^2 = 82 -> 8^2 + 2^2 = 68 -> ... -> 1"
      }
    ],
    starterCode: {
      javascript: `function isHappy(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isHappy(int n) {
        
    }
};`,
      c: `bool isHappy(int n) {
    
}`,
      python: `class Solution:
    def isHappy(self, n: int) -> bool:
        `,
      java: `class Solution {
    public boolean isHappy(int n) {
        
    }
}`
    },
    handlerFunction: "isHappy",
    testCases: [
      { input: [19], expected: true },
      { input: [2], expected: false }
    ]
  },

  // 20. Plus One
  {
    id: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    category: "Array",
    order: 20,
    videoId: "",
    description: `You are given a large integer represented as an integer array \`digits\`, where each \`digits[i]\` is the ith digit of the integer.

Increment the large integer by one and return the resulting array of digits.`,
    examples: [
      {
        id: 1,
        inputText: "digits = [1,2,3]",
        outputText: "[1,2,4]",
        explanation: "The array represents the integer 123. Incrementing by one gives 123 + 1 = 124."
      }
    ],
    starterCode: {
      javascript: `function plusOne(digits) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> plusOne(vector<int>& digits) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* plusOne(int* digits, int digitsSize, int* returnSize) {
    
}`,
      python: `class Solution:
    def plusOne(self, digits: List[int]) -> List[int]:
        `,
      java: `class Solution {
    public int[] plusOne(int[] digits) {
        
    }
}`
    },
    handlerFunction: "plusOne",
    testCases: [
      { input: [[1,2,3]], expected: [1,2,4] },
      { input: [[4,3,2,1]], expected: [4,3,2,2] },
      { input: [[9]], expected: [1,0] }
    ]
  },

  // 21. Sqrt(x)
  {
    id: "sqrt-x",
    title: "Sqrt(x)",
    difficulty: "Easy",
    category: "Math",
    order: 21,
    videoId: "",
    description: `Given a non-negative integer \`x\`, return the square root of \`x\` rounded down to the nearest integer. The returned integer should be non-negative as well.`,
    examples: [
      {
        id: 1,
        inputText: "x = 4",
        outputText: "2",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function mySqrt(x) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int mySqrt(int x) {
        
    }
};`,
      c: `int mySqrt(int x) {
    
}`,
      python: `class Solution:
    def mySqrt(self, x: int) -> int:
        `,
      java: `class Solution {
    public int mySqrt(int x) {
        
    }
}`
    },
    handlerFunction: "mySqrt",
    testCases: [
      { input: [4], expected: 2 },
      { input: [8], expected: 2 }
    ]
  },

  // 22. Search Insert Position
  {
    id: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "Easy",
    category: "Binary Search",
    order: 22,
    videoId: "",
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,3,5,6], target = 5",
        outputText: "2",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function searchInsert(nums, target) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int searchInsert(vector<int>& nums, int target) {
        
    }
};`,
      c: `int searchInsert(int* nums, int numsSize, int target) {
    
}`,
      python: `class Solution:
    def searchInsert(self, nums: List[int], target: int) -> int:
        `,
      java: `class Solution {
    public int searchInsert(int[] nums, int target) {
        
    }
}`
    },
    handlerFunction: "searchInsert",
    testCases: [
      { input: [[1,3,5,6], 5], expected: 2 },
      { input: [[1,3,5,6], 2], expected: 1 },
      { input: [[1,3,5,6], 7], expected: 4 }
    ]
  },

  // 23. Length of Last Word
  {
    id: "length-of-last-word",
    title: "Length of Last Word",
    difficulty: "Easy",
    category: "String",
    order: 23,
    videoId: "",
    description: `Given a string \`s\` consisting of words and spaces, return the length of the last word in the string.`,
    examples: [
      {
        id: 1,
        inputText: 's = "Hello World"',
        outputText: "5",
        explanation: "The last word is \"World\" with length 5."
      }
    ],
    starterCode: {
      javascript: `function lengthOfLastWord(s) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int lengthOfLastWord(string s) {
        
    }
};`,
      c: `int lengthOfLastWord(char* s) {
    
}`,
      python: `class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        `,
      java: `class Solution {
    public int lengthOfLastWord(String s) {
        
    }
}`
    },
    handlerFunction: "lengthOfLastWord",
    testCases: [
      { input: ["Hello World"], expected: 5 },
      { input: ["   fly me   to   the moon  "], expected: 4 },
      { input: ["luffy is still joyboy"], expected: 6 }
    ]
  },

  // 24. Roman to Integer
  {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "String",
    order: 24,
    videoId: "",
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
    
Given a roman numeral, convert it to an integer.`,
    examples: [
      {
        id: 1,
        inputText: 's = "III"',
        outputText: "3",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function romanToInt(s) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int romanToInt(string s) {
        
    }
};`,
      c: `int romanToInt(char* s) {
    
}`,
      python: `class Solution:
    def romanToInt(self, s: str) -> int:
        `,
      java: `class Solution {
    public int romanToInt(String s) {
        
    }
}`
    },
    handlerFunction: "romanToInt",
    testCases: [
      { input: ["III"], expected: 3 },
      { input: ["LVIII"], expected: 58 },
      { input: ["MCMXCIV"], expected: 1994 }
    ]
  },

  // 25. Longest Common Prefix
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String",
    order: 25,
    videoId: "",
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".`,
    examples: [
      {
        id: 1,
        inputText: 'strs = ["flower","flow","flight"]',
        outputText: '"fl"',
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    string longestCommonPrefix(vector<string>& strs) {
        
    }
};`,
      c: `char* longestCommonPrefix(char** strs, int strsSize) {
    
}`,
      python: `class Solution:
    def longestCommonPrefix(self, strs: List[str]) -> str:
        `,
      java: `class Solution {
    public String longestCommonPrefix(String[] strs) {
        
    }
}`
    },
    handlerFunction: "longestCommonPrefix",
    testCases: [
      { input: [["flower","flow","flight"]], expected: "fl" },
      { input: [["dog","racecar","car"]], expected: "" }
    ]
  },

  // 26. Number of 1 Bits
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 26,
    videoId: "",
    description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits it has (also known as the Hamming weight).`,
    examples: [
      {
        id: 1,
        inputText: "n = 11",
        outputText: "3",
        explanation: "The input binary string 00000000000000000000000000001011 has a total of three set bits."
      }
    ],
    starterCode: {
      javascript: `function hammingWeight(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int hammingWeight(int n) {
        
    }
};`,
      c: `int hammingWeight(int n) {
    
}`,
      python: `class Solution:
    def hammingWeight(self, n: int) -> int:
        `,
      java: `class Solution {
    public int hammingWeight(int n) {
        
    }
}`
    },
    handlerFunction: "hammingWeight",
    testCases: [
      { input: [11], expected: 3 },
      { input: [128], expected: 1 }
    ]
  },

  // 27. Valid Perfect Square
  {
    id: "valid-perfect-square",
    title: "Valid Perfect Square",
    difficulty: "Easy",
    category: "Math",
    order: 27,
    videoId: "",
    description: `Given a positive integer num, return true if num is a perfect square or false otherwise.`,
    examples: [
      {
        id: 1,
        inputText: "num = 16",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isPerfectSquare(num) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isPerfectSquare(int num) {
        
    }
};`,
      c: `bool isPerfectSquare(int num) {
    
}`,
      python: `class Solution:
    def isPerfectSquare(self, num: int) -> bool:
        `,
      java: `class Solution {
    public boolean isPerfectSquare(int num) {
        
    }
}`
    },
    handlerFunction: "isPerfectSquare",
    testCases: [
      { input: [16], expected: true },
      { input: [14], expected: false }
    ]
  },

  // 28. Arranging Coins
  {
    id: "arranging-coins",
    title: "Arranging Coins",
    difficulty: "Easy",
    category: "Binary Search",
    order: 28,
    videoId: "",
    description: `You have \`n\` coins and you want to build a staircase with these coins. The staircase consists of \`k\` rows where the \`ith\` row has exactly \`i\` coins. The last row of the staircase may be incomplete.

Given the integer \`n\`, return the number of complete rows of the staircase you can build.`,
    examples: [
      {
        id: 1,
        inputText: "n = 5",
        outputText: "2",
        explanation: "Because the 3rd row is incomplete, we return 2."
      }
    ],
    starterCode: {
      javascript: `function arrangeCoins(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int arrangeCoins(int n) {
        
    }
};`,
      c: `int arrangeCoins(int n) {
    
}`,
      python: `class Solution:
    def arrangeCoins(self, n: int) -> int:
        `,
      java: `class Solution {
    public int arrangeCoins(int n) {
        
    }
}`
    },
    handlerFunction: "arrangeCoins",
    testCases: [
      { input: [5], expected: 2 },
      { input: [8], expected: 3 }
    ]
  },

  // 29. Find the Difference
  {
    id: "find-the-difference",
    title: "Find the Difference",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 29,
    videoId: "",
    description: `You are given two strings \`s\` and \`t\`.
    
String \`t\` is generated by random shuffling string \`s\` and then add one more letter at a random position. Return the letter that was added to \`t\`.`,
    examples: [
      {
        id: 1,
        inputText: 's = "abcd", t = "abcde"',
        outputText: '"e"',
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function findTheDifference(s, t) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    char findTheDifference(string s, string t) {
        
    }
};`,
      c: `char findTheDifference(char* s, char* t) {
    
}`,
      python: `class Solution:
    def findTheDifference(self, s: str, t: str) -> str:
        `,
      java: `class Solution {
    public char findTheDifference(String s, String t) {
        
    }
}`
    },
    handlerFunction: "findTheDifference",
    testCases: [
      { input: ["abcd", "abcde"], expected: "e" },
      { input: ["", "y"], expected: "y" }
    ]
  },

  // 30. Jewels and Stones
  {
    id: "jewels-and-stones",
    title: "Jewels and Stones",
    difficulty: "Easy",
    category: "String",
    order: 30,
    videoId: "",
    description: `You're given strings \`jewels\` representing the types of stones that are jewels, and \`stones\` representing the stones you have. Each character in \`stones\` is a type of stone you have. You want to know how many of the stones you have are also jewels.`,
    examples: [
      {
        id: 1,
        inputText: 'jewels = "aA", stones = "aAAbbbb"',
        outputText: "3",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function numJewelsInStones(jewels, stones) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int numJewelsInStones(string jewels, string stones) {
        
    }
};`,
      c: `int numJewelsInStones(char* jewels, char* stones) {
    
}`,
      python: `class Solution:
    def numJewelsInStones(self, jewels: str, stones: str) -> int:
        `,
      java: `class Solution {
    public int numJewelsInStones(String jewels, String stones) {
        
    }
}`
    },
    handlerFunction: "numJewelsInStones",
    testCases: [
      { input: ["aA", "aAAbbbb"], expected: 3 },
      { input: ["z", "ZZ"], expected: 0 }
    ]
  },

  // 31. Monotonic Array
  {
    id: "monotonic-array",
    title: "Monotonic Array",
    difficulty: "Easy",
    category: "Array",
    order: 31,
    videoId: "",
    description: `An array is monotonic if it is either monotone increasing or monotone decreasing. Return \`true\` if and only if the given array \`nums\` is monotonic.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,2,3]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isMonotonic(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isMonotonic(vector<int>& nums) {
        
    }
};`,
      c: `bool isMonotonic(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def isMonotonic(self, nums: List[int]) -> bool:
        `,
      java: `class Solution {
    public boolean isMonotonic(int[] nums) {
        
    }
}`
    },
    handlerFunction: "isMonotonic",
    testCases: [
      { input: [[1,2,2,3]], expected: true },
      { input: [[1,3,2]], expected: false }
    ]
  },

  // 32. Detect Capital
  {
    id: "detect-capital",
    title: "Detect Capital",
    difficulty: "Easy",
    category: "String",
    order: 32,
    videoId: "",
    description: `Given a string \`word\`, return \`true\` if the usage of capitals in it is right (All caps, no caps, or Title case).`,
    examples: [
      {
        id: 1,
        inputText: 'word = "USA"',
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function detectCapitalUse(word) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool detectCapitalUse(string word) {
        
    }
};`,
      c: `bool detectCapitalUse(char* word) {
    
}`,
      python: `class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        `,
      java: `class Solution {
    public boolean detectCapitalUse(String word) {
        
    }
}`
    },
    handlerFunction: "detectCapitalUse",
    testCases: [
      { input: ["USA"], expected: true },
      { input: ["FlaG"], expected: false }
    ]
  },

  // 33. Reverse Words in a String III
  {
    id: "reverse-words-iii",
    title: "Reverse Words in a String III",
    difficulty: "Easy",
    category: "String",
    order: 33,
    videoId: "",
    description: `Given a string \`s\`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.`,
    examples: [
      {
        id: 1,
        inputText: 's = "Let\'s take LeetCode contest"',
        outputText: '"s\'teL ekat edoCteeL tsetnoc"',
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function reverseWords(s) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    string reverseWords(string s) {
        
    }
};`,
      c: `char* reverseWords(char* s) {
    
}`,
      python: `class Solution:
    def reverseWords(self, s: str) -> str:
        `,
      java: `class Solution {
    public String reverseWords(String s) {
        
    }
}`
    },
    handlerFunction: "reverseWords",
    testCases: [
      { input: ["Let's take LeetCode contest"], expected: "s'teL ekat edoCteeL tsetnoc" }
    ]
  },

  // 34. Rotate String
  {
    id: "rotate-string",
    title: "Rotate String",
    difficulty: "Easy",
    category: "String",
    order: 34,
    videoId: "",
    description: `Given two strings \`s\` and \`goal\`, return \`true\` if and only if \`s\` can become \`goal\` after some number of shifts on \`s\`.`,
    examples: [
      {
        id: 1,
        inputText: 's = "abcde", goal = "cdeab"',
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function rotateString(s, goal) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool rotateString(string s, string goal) {
        
    }
};`,
      c: `bool rotateString(char* s, char* goal) {
    
}`,
      python: `class Solution:
    def rotateString(self, s: str, goal: str) -> bool:
        `,
      java: `class Solution {
    public boolean rotateString(String s, String goal) {
        
    }
}`
    },
    handlerFunction: "rotateString",
    testCases: [
      { input: ["abcde", "cdeab"], expected: true },
      { input: ["abcde", "abced"], expected: false }
    ]
  },

  // 35. Height Checker
  {
    id: "height-checker",
    title: "Height Checker",
    difficulty: "Easy",
    category: "Array",
    order: 35,
    videoId: "",
    description: `Return the number of indices where the heights do not match the expected sorted order.`,
    examples: [
      {
        id: 1,
        inputText: "heights = [1,1,4,2,1,3]",
        outputText: "3",
        explanation: "Expected: [1,1,1,2,3,4]. Indices 2, 4, and 5 mismatch."
      }
    ],
    starterCode: {
      javascript: `function heightChecker(heights) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int heightChecker(vector<int>& heights) {
        
    }
};`,
      c: `int heightChecker(int* heights, int heightsSize) {
    
}`,
      python: `class Solution:
    def heightChecker(self, heights: List[int]) -> int:
        `,
      java: `class Solution {
    public int heightChecker(int[] heights) {
        
    }
}`
    },
    handlerFunction: "heightChecker",
    testCases: [
      { input: [[1,1,4,2,1,3]], expected: 3 }
    ]
  },

  // 36. Unique Number of Occurrences
  {
    id: "unique-occurrences",
    title: "Unique Number of Occurrences",
    difficulty: "Easy",
    category: "Array",
    order: 36,
    videoId: "",
    description: `Given an array of integers \`arr\`, return \`true\` if the number of occurrences of each value in the array is **unique** or \`false\` otherwise.`,
    examples: [
      {
        id: 1,
        inputText: "arr = [1,2,2,1,1,3]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function uniqueOccurrences(arr) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool uniqueOccurrences(vector<int>& arr) {
        
    }
};`,
      c: `bool uniqueOccurrences(int* arr, int arrSize) {
    
}`,
      python: `class Solution:
    def uniqueOccurrences(self, arr: List[int]) -> bool:
        `,
      java: `class Solution {
    public boolean uniqueOccurrences(int[] arr) {
        
    }
}`
    },
    handlerFunction: "uniqueOccurrences",
    testCases: [
      { input: [[1,2,2,1,1,3]], expected: true }
    ]
  },

  // 37. Find Numbers with Even Number of Digits
  {
    id: "even-number-digits",
    title: "Find Numbers with Even Number of Digits",
    difficulty: "Easy",
    category: "Array",
    order: 37,
    videoId: "",
    description: `Given an array \`nums\` of integers, return how many of them contain an **even number** of digits.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [12,345,2,6,7896]",
        outputText: "2",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function findNumbers(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int findNumbers(vector<int>& nums) {
        
    }
};`,
      c: `int findNumbers(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def findNumbers(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int findNumbers(int[] nums) {
        
    }
}`
    },
    handlerFunction: "findNumbers",
    testCases: [
      { input: [[12,345,2,6,7896]], expected: 2 }
    ]
  },

  // 38. Running Sum of 1d Array
  {
    id: "running-sum",
    title: "Running Sum of 1d Array",
    difficulty: "Easy",
    category: "Array",
    order: 38,
    videoId: "",
    description: `Return the running sum of \`nums\`.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,3,4]",
        outputText: "[1,3,6,10]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function runningSum(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> runningSum(vector<int>& nums) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* runningSum(int* nums, int numsSize, int* returnSize) {
    
}`,
      python: `class Solution:
    def runningSum(self, nums: List[int]) -> List[int]:
        `,
      java: `class Solution {
    public int[] runningSum(int[] nums) {
        
    }
}`
    },
    handlerFunction: "runningSum",
    testCases: [
      { input: [[1,2,3,4]], expected: [1,3,6,10] }
    ]
  },

  // 39. Richest Customer Wealth
  {
    id: "richest-customer-wealth",
    title: "Richest Customer Wealth",
    difficulty: "Easy",
    category: "Array",
    order: 39,
    videoId: "",
    description: `Return the wealth that the richest customer has (sum of each row in the grid).`,
    examples: [
      {
        id: 1,
        inputText: "accounts = [[1,2,3],[3,2,1]]",
        outputText: "6",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function maximumWealth(accounts) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int maximumWealth(vector<vector<int>>& accounts) {
        
    }
};`,
      c: `int maximumWealth(int** accounts, int accountsSize, int* accountsColSize) {
    
}`,
      python: `class Solution:
    def maximumWealth(self, accounts: List[List[int]]) -> int:
        `,
      java: `class Solution {
    public int maximumWealth(int[][] accounts) {
        
    }
}`
    },
    handlerFunction: "maximumWealth",
    testCases: [
      { input: [[[1,2,3],[3,2,1]]], expected: 6 }
    ]
  },

  // 40. Shuffle the Array
  {
    id: "shuffle-the-array",
    title: "Shuffle the Array",
    difficulty: "Easy",
    category: "Array",
    order: 40,
    videoId: "",
    description: `Return the array in the form [x1,y1,x2,y2,...,xn,yn].`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,5,1,3,4,7], n = 3",
        outputText: "[2,3,5,4,1,7]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function shuffle(nums, n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> shuffle(vector<int>& nums, int n) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* shuffle(int* nums, int numsSize, int n, int* returnSize) {
    
}`,
      python: `class Solution:
    def shuffle(self, nums: List[int], n: int) -> List[int]:
        `,
      java: `class Solution {
    public int[] shuffle(int[] nums, int n) {
        
    }
}`
    },
    handlerFunction: "shuffle",
    testCases: [
      { input: [[2,5,1,3,4,7], 3], expected: [2,3,5,4,1,7] }
    ]
  },

  // 41. Defanging an IP Address
  {
    id: "defanging-ip-address",
    title: "Defanging an IP Address",
    difficulty: "Easy",
    category: "String",
    order: 41,
    videoId: "",
    description: `A defanged IP address replaces every period "." with "[.]".`,
    examples: [
      {
        id: 1,
        inputText: 'address = "1.1.1.1"',
        outputText: '"1[.]1[.]1[.]1"',
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function defangIPaddr(address) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    string defangIPaddr(string address) {
        
    }
};`,
      c: `char* defangIPaddr(char* address) {
    
}`,
      python: `class Solution:
    def defangIPaddr(self, address: str) -> str:
        `,
      java: `class Solution {
    public String defangIPaddr(String address) {
        
    }
}`
    },
    handlerFunction: "defangIPaddr",
    testCases: [
      { input: ["1.1.1.1"], expected: "1[.]1[.]1[.]1" }
    ]
  },

  // 42. Kids With the Greatest Number of Candies
  {
    id: "kids-with-candies",
    title: "Kids With Candies",
    difficulty: "Easy",
    category: "Array",
    order: 42,
    videoId: "",
    description: `Return a boolean array result where result[i] is true if the ith kid has the greatest number of candies after adding extraCandies.`,
    examples: [
      {
        id: 1,
        inputText: "candies = [2,3,5,1,3], extraCandies = 3",
        outputText: "[true,true,true,false,true]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function kidsWithCandies(candies, extraCandies) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
bool* kidsWithCandies(int* candies, int candiesSize, int extraCandies, int* returnSize) {
    
}`,
      python: `class Solution:
    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:
        `,
      java: `class Solution {
    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {
        
    }
}`
    },
    handlerFunction: "kidsWithCandies",
    testCases: [
      { input: [[2,3,5,1,3], 3], expected: [true,true,true,false,true] }
    ]
  },

  // 43. 3Sum
  {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 43,
    videoId: "",
    description: `Return all unique triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [-1,0,1,2,-1,-4]",
        outputText: "[[-1,-1,2],[-1,0,1]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function threeSum(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<int>> threeSum(vector<int>& nums) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def threeSum(self, nums: List[int]) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> threeSum(int[] nums) {
        
    }
}`
    },
    handlerFunction: "threeSum",
    testCases: [
      { input: [[-1,0,1,2,-1,-4]], expected: [[-1,-1,2],[-1,0,1]] }
    ]
  },

  // 44. Group Anagrams
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "String",
    order: 44,
    videoId: "",
    description: `Given an array of strings strs, group the anagrams together.`,
    examples: [
      {
        id: 1,
        inputText: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        outputText: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function groupAnagrams(strs) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<string>> groupAnagrams(vector<string>& strs) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:
        `,
      java: `class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        
    }
}`
    },
    handlerFunction: "groupAnagrams",
    testCases: [
      { input: [["eat","tea","tan","ate","nat","bat"]], expected: [["eat","tea","ate"],["tan","nat"],["bat"]] }
    ]
  },

  // 45. Product of Array Except Self
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array",
    order: 45,
    videoId: "",
    description: `Return an array answer such that answer[i] is equal to the product of all the elements of nums except nums[i].`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,3,4]",
        outputText: "[24,12,8,6]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function productExceptSelf(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> productExceptSelf(vector<int>& nums) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* productExceptSelf(int* nums, int numsSize, int* returnSize) {
    
}`,
      python: `class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        `,
      java: `class Solution {
    public int[] productExceptSelf(int[] nums) {
        
    }
}`
    },
    handlerFunction: "productExceptSelf",
    testCases: [
      { input: [[1,2,3,4]], expected: [24,12,8,6] }
    ]
  },

  // 46. Container With Most Water
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 46,
    videoId: "",
    description: `Find two lines that together with the x-axis form a container, such that the container contains the most water.`,
    examples: [
      {
        id: 1,
        inputText: "height = [1,8,6,2,5,4,8,3,7]",
        outputText: "49",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function maxArea(height) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int maxArea(vector<int>& height) {
        
    }
};`,
      c: `int maxArea(int* height, int heightSize) {
    
}`,
      python: `class Solution:
    def maxArea(self, height: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxArea(int[] height) {
        
    }
}`
    },
    handlerFunction: "maxArea",
    testCases: [
      { input: [[1,8,6,2,5,4,8,3,7]], expected: 49 }
    ]
  },

  // 47. Top K Frequent Elements
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap",
    order: 47,
    videoId: "",
    description: `Given an integer array nums and an integer k, return the k most frequent elements.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,1,1,2,2,3], k = 2",
        outputText: "[1,2]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> topKFrequent(vector<int>& nums, int k) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {
    
}`,
      python: `class Solution:
    def topKFrequent(self, nums: List[int], k: int) -> List[int]:
        `,
      java: `class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        
    }
}`
    },
    handlerFunction: "topKFrequent",
    testCases: [
      { input: [[1,1,1,2,2,3], 2], expected: [1,2] }
    ]
  },

  // 48. Longest Consecutive Sequence
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Array",
    order: 48,
    videoId: "",
    description: `Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence. O(n) time required.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [100,4,200,1,3,2]",
        outputText: "4",
        explanation: "1, 2, 3, 4"
      }
    ],
    starterCode: {
      javascript: `function longestConsecutive(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int longestConsecutive(vector<int>& nums) {
        
    }
};`,
      c: `int longestConsecutive(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int longestConsecutive(int[] nums) {
        
    }
}`
    },
    handlerFunction: "longestConsecutive",
    testCases: [
      { input: [[100,4,200,1,3,2]], expected: 4 }
    ]
  },

  // 49. Find Minimum in Rotated Sorted Array
  {
    id: "find-min-rotated-sorted",
    title: "Find Min in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    order: 49,
    videoId: "",
    description: `Given the sorted rotated array nums of unique elements, return the minimum element of this array.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [3,4,5,1,2]",
        outputText: "1",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function findMin(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int findMin(vector<int>& nums) {
        
    }
};`,
      c: `int findMin(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def findMin(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int findMin(int[] nums) {
        
    }
}`
    },
    handlerFunction: "findMin",
    testCases: [
      { input: [[3,4,5,1,2]], expected: 1 }
    ]
  },

  // 50. House Robber
  {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "DP",
    order: 50,
    videoId: "",
    description: `Return the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,3,1]",
        outputText: "4",
        explanation: "1 + 3 = 4"
      }
    ],
    starterCode: {
      javascript: `function rob(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int rob(vector<int>& nums) {
        
    }
};`,
      c: `int rob(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def rob(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int rob(int[] nums) {
        
    }
}`
    },
    handlerFunction: "rob",
    testCases: [
      { input: [[1,2,3,1]], expected: 4 }
    ]
  },
  // 51. Valid Parentheses
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 51,
    videoId: "",
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.`,
    examples: [
      {
        id: 1,
        inputText: 's = "()[]{}"',
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your code here
};`,
      cpp: `#include <string>
#include <stack>
class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
      c: `bool isValid(char* s) {
    
}`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        `,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`
    },
    handlerFunction: "isValid",
    testCases: [
      { input: ["()[]{}"], expected: true },
      { input: ["(]"], expected: false }
    ]
  },

  // 52. Merge Intervals
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    order: 52,
    videoId: "",
    description: `Given an array of \`intervals\` where \`intervals[i] = [start, end]\`, merge all overlapping intervals.`,
    examples: [
      {
        id: 1,
        inputText: "intervals = [[1,3],[2,6],[8,10],[15,18]]",
        outputText: "[[1,6],[8,10],[15,18]]",
        explanation: "Since [1,3] and [2,6] overlap, merge them into [1,6]."
      }
    ],
    starterCode: {
      javascript: `function merge(intervals) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def merge(self, intervals: List[List[int]]) -> List[List[int]]:
        `,
      java: `class Solution {
    public int[][] merge(int[][] intervals) {
        
    }
}`
    },
    handlerFunction: "merge",
    testCases: [
      { input: [[[1,3],[2,6],[8,10],[15,18]]], expected: [[1,6],[8,10],[15,18]] }
    ]
  },

  // 53. Maximum Subarray
  {
    id: "maximum-subarray",
    title: "Maximum Subarray",
    difficulty: "Medium",
    category: "DP",
    order: 53,
    videoId: "",
    description: `Given an integer array \`nums\`, find the subarray which has the largest sum and return its sum.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [-2,1,-3,4,-1,2,1,-5,4]",
        outputText: "6",
        explanation: "Subarray [4,-1,2,1] has the largest sum 6."
      }
    ],
    starterCode: {
      javascript: `function maxSubArray(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        
    }
};`,
      c: `int maxSubArray(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def maxSubArray(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int maxSubArray(int[] nums) {
        
    }
}`
    },
    handlerFunction: "maxSubArray",
    testCases: [
      { input: [[-2,1,-3,4,-1,2,1,-5,4]], expected: 6 }
    ]
  },

  // 54. Climbing Stairs
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "DP",
    order: 54,
    videoId: "",
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?`,
    examples: [
      {
        id: 1,
        inputText: "n = 3",
        outputText: "3",
        explanation: "1+1+1, 1+2, 2+1"
      }
    ],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
      c: `int climbStairs(int n) {
    
}`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        `,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`
    },
    handlerFunction: "climbStairs",
    testCases: [
      { input: [3], expected: 3 }
    ]
  },

  // 55. Reverse Linked List
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    order: 55,
    videoId: "",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.`,
    examples: [
      {
        id: 1,
        inputText: "head = [1,2,3,4,5]",
        outputText: "[5,4,3,2,1]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 * this.val = (val===undefined ? 0 : val)
 * this.next = (next===undefined ? null : next)
 * }
 */
function reverseList(head) {
  // Write your code here
};`,
      cpp: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 * int val;
 * ListNode *next;
 * ListNode() : val(0), next(nullptr) {}
 * ListNode(int x) : val(x), next(nullptr) {}
 * ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* reverseList(ListNode* head) {
        
    }
};`,
      c: `/**
 * Definition for singly-linked list.
 * struct ListNode {
 * int val;
 * struct ListNode *next;
 * };
 */
struct ListNode* reverseList(struct ListNode* head) {
    
}`,
      python: `class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        `,
      java: `/**
 * Definition for singly-linked list.
 * public class ListNode {
 * int val;
 * ListNode next;
 * ListNode() {}
 * ListNode(int val) { this.val = val; }
 * ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode reverseList(ListNode head) {
        
    }
}`
    },
    handlerFunction: "reverseList",
    testCases: [
      { input: [[1,2,3,4,5]], expected: [5,4,3,2,1] }
    ]
  },

  // 56. Merge Two Sorted Lists
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    order: 56,
    videoId: "",
    description: `Merge two sorted linked lists and return it as a sorted list.`,
    examples: [
      {
        id: 1,
        inputText: "list1 = [1,2,4], list2 = [1,3,4]",
        outputText: "[1,1,2,3,4,4]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {
        
    }
};`,
      c: `struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {
    
}`,
      python: `class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        `,
      java: `class Solution {
    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {
        
    }
}`
    },
    handlerFunction: "mergeTwoLists",
    testCases: [
      { input: [[1,2,4], [1,3,4]], expected: [1,1,2,3,4,4] }
    ]
  },

  // 57. Linked List Cycle
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List",
    order: 57,
    videoId: "",
    description: `Given head, the head of a linked list, determine if the linked list has a cycle in it. Return true if there is a cycle, false otherwise.`,
    examples: [
      {
        id: 1,
        inputText: "head = [3,2,0,-4], pos = 1",
        outputText: "true",
        explanation: "Tail connects to the 1st node (0-indexed)."
      }
    ],
    starterCode: {
      javascript: `function hasCycle(head) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool hasCycle(ListNode *head) {
        
    }
};`,
      c: `bool hasCycle(struct ListNode *head) {
    
}`,
      python: `class Solution:
    def hasCycle(self, head: Optional[ListNode]) -> bool:
        `,
      java: `public class Solution {
    public boolean hasCycle(ListNode head) {
        
    }
}`
    },
    handlerFunction: "hasCycle",
    testCases: [
      { input: [[3,2,0,-4]], expected: true }
    ]
  },

  // 58. Invert Binary Tree
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 58,
    videoId: "",
    description: `Given the root of a binary tree, invert the tree, and return its root.`,
    examples: [
      {
        id: 1,
        inputText: "root = [4,2,7,1,3,6,9]",
        outputText: "[4,7,2,9,6,3,1]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 * this.val = (val===undefined ? 0 : val)
 * this.left = (left===undefined ? null : left)
 * this.right = (right===undefined ? null : right)
 * }
 */
function invertTree(root) {
  // Write your code here
};`,
      cpp: `/**
 * Definition for a binary tree node.
 * struct TreeNode {
 * int val;
 * TreeNode *left;
 * TreeNode *right;
 * TreeNode() : val(0), left(nullptr), right(nullptr) {}
 * TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 * TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    TreeNode* invertTree(TreeNode* root) {
        
    }
};`,
      c: `struct TreeNode* invertTree(struct TreeNode* root) {
    
}`,
      python: `class Solution:
    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:
        `,
      java: `class Solution {
    public TreeNode invertTree(TreeNode root) {
        
    }
}`
    },
    handlerFunction: "invertTree",
    testCases: [
      { input: [[4,2,7,1,3,6,9]], expected: [4,7,2,9,6,3,1] }
    ]
  },

  // 59. Maximum Depth of Binary Tree
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 59,
    videoId: "",
    description: `Given the root of a binary tree, return its maximum depth.`,
    examples: [
      {
        id: 1,
        inputText: "root = [3,9,20,null,null,15,7]",
        outputText: "3",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function maxDepth(root) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int maxDepth(TreeNode* root) {
        
    }
};`,
      c: `int maxDepth(struct TreeNode* root) {
    
}`,
      python: `class Solution:
    def maxDepth(self, root: Optional[TreeNode]) -> int:
        `,
      java: `class Solution {
    public int maxDepth(TreeNode root) {
        
    }
}`
    },
    handlerFunction: "maxDepth",
    testCases: [
      { input: [[3,9,20,null,null,15,7]], expected: 3 }
    ]
  },

  // 60. Same Tree
  {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 60,
    videoId: "",
    description: `Given the roots of two binary trees p and q, write a function to check if they are the same or not.`,
    examples: [
      {
        id: 1,
        inputText: "p = [1,2,3], q = [1,2,3]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isSameTree(p, q) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        
    }
};`,
      c: `bool isSameTree(struct TreeNode* p, struct TreeNode* q) {
    
}`,
      python: `class Solution:
    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:
        `,
      java: `class Solution {
    public boolean isSameTree(TreeNode p, TreeNode q) {
        
    }
}`
    },
    handlerFunction: "isSameTree",
    testCases: [
      { input: [[1,2,3], [1,2,3]], expected: true }
    ]
  },

  // 61. Binary Tree Level Order Traversal
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree",
    order: 61,
    videoId: "",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).`,
    examples: [
      {
        id: 1,
        inputText: "root = [3,9,20,null,null,15,7]",
        outputText: "[[3],[9,20],[15,7]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function levelOrder(root) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> levelOrder(TreeNode root) {
        
    }
}`
    },
    handlerFunction: "levelOrder",
    testCases: [
      { input: [[3,9,20,null,null,15,7]], expected: [[3],[9,20],[15,7]] }
    ]
  },

  // 62. Validate Binary Search Tree
  {
    id: "validate-bst",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Tree",
    order: 62,
    videoId: "",
    description: `Given the root of a binary tree, determine if it is a valid binary search tree (BST).`,
    examples: [
      {
        id: 1,
        inputText: "root = [2,1,3]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function isValidBST(root) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool isValidBST(TreeNode* root) {
        
    }
};`,
      c: `bool isValidBST(struct TreeNode* root) {
    
}`,
      python: `class Solution:
    def isValidBST(self, root: Optional[TreeNode]) -> bool:
        `,
      java: `class Solution {
    public boolean isValidBST(TreeNode root) {
        
    }
}`
    },
    handlerFunction: "isValidBST",
    testCases: [
      { input: [[2,1,3]], expected: true }
    ]
  },

  // 63. Number of Islands
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph",
    order: 63,
    videoId: "",
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.`,
    examples: [
      {
        id: 1,
        inputText: 'grid = [["1","1","0"],["0","1","0"],["0","0","0"]]',
        outputText: "1",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function numIslands(grid) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int numIslands(vector<vector<char>>& grid) {
        
    }
};`,
      c: `int numIslands(char** grid, int gridSize, int* gridColSize) {
    
}`,
      python: `class Solution:
    def numIslands(self, grid: List[List[str]]) -> int:
        `,
      java: `class Solution {
    public int numIslands(char[][] grid) {
        
    }
}`
    },
    handlerFunction: "numIslands",
    testCases: [
      { input: [[["1","1","0"],["0","1","0"],["0","0","0"]]], expected: 1 }
    ]
  },

  // 64. Coin Change
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "DP",
    order: 64,
    videoId: "",
    description: `Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.`,
    examples: [
      {
        id: 1,
        inputText: "coins = [1,2,5], amount = 11",
        outputText: "3",
        explanation: "11 = 5 + 5 + 1"
      }
    ],
    starterCode: {
      javascript: `function coinChange(coins, amount) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int coinChange(vector<int>& coins, int amount) {
        
    }
};`,
      c: `int coinChange(int* coins, int coinsSize, int amount) {
    
}`,
      python: `class Solution:
    def coinChange(self, coins: List[int], amount: int) -> int:
        `,
      java: `class Solution {
    public int coinChange(int[] coins, int amount) {
        
    }
}`
    },
    handlerFunction: "coinChange",
    testCases: [
      { input: [[1,2,5], 11], expected: 3 }
    ]
  },

  // 65. Longest Increasing Subsequence
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "DP",
    order: 65,
    videoId: "",
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [10,9,2,5,3,7,101,18]",
        outputText: "4",
        explanation: "[2,3,7,101]"
      }
    ],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int lengthOfLIS(vector<int>& nums) {
        
    }
};`,
      c: `int lengthOfLIS(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def lengthOfLIS(self, nums: List[int]) -> int:
        `,
      java: `class Solution {
    public int lengthOfLIS(int[] nums) {
        
    }
}`
    },
    handlerFunction: "lengthOfLIS",
    testCases: [
      { input: [[10,9,2,5,3,7,101,18]], expected: 4 }
    ]
  },

  // 66. Word Break
  {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "DP",
    order: 66,
    videoId: "",
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.`,
    examples: [
      {
        id: 1,
        inputText: 's = "leetcode", wordDict = ["leet","code"]',
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool wordBreak(string s, vector<string>& wordDict) {
        
    }
};`,
      c: `bool wordBreak(char* s, char** wordDict, int wordDictSize) {
    
}`,
      python: `class Solution:
    def wordBreak(self, s: str, wordDict: List[str]) -> bool:
        `,
      java: `class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        
    }
}`
    },
    handlerFunction: "wordBreak",
    testCases: [
      { input: ["leetcode", ["leet","code"]], expected: true }
    ]
  },

  // 67. Search in Rotated Sorted Array
  {
    id: "search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    order: 67,
    videoId: "",
    description: `Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [4,5,6,7,0,1,2], target = 0",
        outputText: "4",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    
}`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        `,
      java: `class Solution {
    public int search(int[] nums, int target) {
        
    }
}`
    },
    handlerFunction: "search",
    testCases: [
      { input: [[4,5,6,7,0,1,2], 0], expected: 4 }
    ]
  },

  // 68. Combination Sum
  {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    order: 68,
    videoId: "",
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`.`,
    examples: [
      {
        id: 1,
        inputText: "candidates = [2,3,6,7], target = 7",
        outputText: "[[2,2,3],[7]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> combinationSum(int[] candidates, int target) {
        
    }
}`
    },
    handlerFunction: "combinationSum",
    testCases: [
      { input: [[2,3,6,7], 7], expected: [[2,2,3],[7]] }
    ]
  },

  // 69. Permutations
  {
    id: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    order: 69,
    videoId: "",
    description: `Given an array \`nums\` of distinct integers, return all the possible permutations.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,3]",
        outputText: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function permute(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<int>> permute(vector<int>& nums) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def permute(self, nums: List[int]) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> permute(int[] nums) {
        
    }
}`
    },
    handlerFunction: "permute",
    testCases: [
      { input: [[1,2,3]], expected: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]] }
    ]
  },

  // 70. Subsets
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    order: 70,
    videoId: "",
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set).`,
    examples: [
      {
        id: 1,
        inputText: "nums = [1,2,3]",
        outputText: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function subsets(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<vector<int>> subsets(vector<int>& nums) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {
    
}`,
      python: `class Solution:
    def subsets(self, nums: List[int]) -> List[List[int]]:
        `,
      java: `class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        
    }
}`
    },
    handlerFunction: "subsets",
    testCases: [
      { input: [[1,2,3]], expected: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]] }
    ]
  },

  // 71. Jump Game
  {
    id: "jump-game",
    title: "Jump Game",
    difficulty: "Medium",
    category: "Greedy",
    order: 71,
    videoId: "",
    description: `You are given an integer array \`nums\`. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position. Return \`true\` if you can reach the last index.`,
    examples: [
      {
        id: 1,
        inputText: "nums = [2,3,1,1,4]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function canJump(nums) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool canJump(vector<int>& nums) {
        
    }
};`,
      c: `bool canJump(int* nums, int numsSize) {
    
}`,
      python: `class Solution:
    def canJump(self, nums: List[int]) -> bool:
        `,
      java: `class Solution {
    public boolean canJump(int[] nums) {
        
    }
}`
    },
    handlerFunction: "canJump",
    testCases: [
      { input: [[2,3,1,1,4]], expected: true }
    ]
  },

  // 72. Rotate Image
  {
    id: "rotate-image",
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Matrix",
    order: 72,
    videoId: "",
    description: `You are given an \`n x n\` 2D matrix representing an image, rotate the image by 90 degrees (clockwise) in-place.`,
    examples: [
      {
        id: 1,
        inputText: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        outputText: "[[7,4,1],[8,5,2],[9,6,3]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function rotate(matrix) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    void rotate(vector<vector<int>>& matrix) {
        
    }
};`,
      c: `void rotate(int** matrix, int matrixSize, int* matrixColSize) {
    
}`,
      python: `class Solution:
    def rotate(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        `,
      java: `class Solution {
    public void rotate(int[][] matrix) {
        
    }
}`
    },
    handlerFunction: "rotate",
    testCases: [
      { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [[7,4,1],[8,5,2],[9,6,3]] }
    ]
  },

  // 73. Set Matrix Zeroes
  {
    id: "set-matrix-zeroes",
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Matrix",
    order: 73,
    videoId: "",
    description: `Given an \`m x n\` integer matrix \`matrix\`, if an element is \`0\`, set its entire row and column to \`0\`'s.`,
    examples: [
      {
        id: 1,
        inputText: "matrix = [[1,1,1],[1,0,1],[1,1,1]]",
        outputText: "[[1,0,1],[0,0,0],[1,0,1]]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
function setZeroes(matrix) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    void setZeroes(vector<vector<int>>& matrix) {
        
    }
};`,
      c: `void setZeroes(int** matrix, int matrixSize, int* matrixColSize) {
    
}`,
      python: `class Solution:
    def setZeroes(self, matrix: List[List[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        `,
      java: `class Solution {
    public void setZeroes(int[][] matrix) {
        
    }
}`
    },
    handlerFunction: "setZeroes",
    testCases: [
      { input: [[[1,1,1],[1,0,1],[1,1,1]]], expected: [[1,0,1],[0,0,0],[1,0,1]] }
    ]
  },

  // 74. Spiral Matrix
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Matrix",
    order: 74,
    videoId: "",
    description: `Given an \`m x n\` matrix, return all elements of the matrix in spiral order.`,
    examples: [
      {
        id: 1,
        inputText: "matrix = [[1,2,3],[4,5,6],[7,8,9]]",
        outputText: "[1,2,3,6,9,8,7,4,5]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function spiralOrder(matrix) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> spiralOrder(vector<vector<int>>& matrix) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* spiralOrder(int** matrix, int matrixSize, int* matrixColSize, int* returnSize) {
    
}`,
      python: `class Solution:
    def spiralOrder(self, matrix: List[List[int]]) -> List[int]:
        `,
      java: `class Solution {
    public List<Integer> spiralOrder(int[][] matrix) {
        
    }
}`
    },
    handlerFunction: "spiralOrder",
    testCases: [
      { input: [[[1,2,3],[4,5,6],[7,8,9]]], expected: [1,2,3,6,9,8,7,4,5] }
    ]
  },

  // 75. Implement Trie (Prefix Tree)
  {
    id: "implement-trie",
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Trie",
    order: 75,
    videoId: "",
    description: `A Trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. Implement the \`Trie\` class.`,
    examples: [
      {
        id: 1,
        inputText: '["Trie", "insert", "search", "search", "startsWith", "insert", "search"]\n[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]',
        outputText: "[null, null, true, false, true, null, true]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `
var Trie = function() {
    
};

/** * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function(word) {
    
};

/** * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function(word) {
    
};

/** * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function(prefix) {
    
};`,
      cpp: `class Trie {
public:
    Trie() {
        
    }
    
    void insert(string word) {
        
    }
    
    bool search(string word) {
        
    }
    
    bool startsWith(string prefix) {
        
    }
};`,
      c: `typedef struct {
    
} Trie;

Trie* trieCreate() {
    
}

void trieInsert(Trie* obj, char* word) {
    
}

bool trieSearch(Trie* obj, char* word) {
    
}

bool trieStartsWith(Trie* obj, char* prefix) {
    
}

void trieFree(Trie* obj) {
    
}`,
      python: `class Trie:

    def __init__(self):
        

    def insert(self, word: str) -> None:
        

    def search(self, word: str) -> bool:
        

    def startsWith(self, prefix: str) -> bool:
        `,
      java: `class Trie {

    public Trie() {
        
    }
    
    public void insert(String word) {
        
    }
    
    public boolean search(String word) {
        
    }
    
    public boolean startsWith(String prefix) {
        
    }
}`
    },
    handlerFunction: "Trie",
    testCases: []
  },

  // 76. Course Schedule
  {
    id: "course-schedule",
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph",
    order: 76,
    videoId: "",
    description: `There are a total of \`numCourses\` courses. You are given an array \`prerequisites\` where \`prerequisites[i] = [ai, bi]\` indicates that you must take course \`bi\` first if you want to take course \`ai\`. Return \`true\` if you can finish all courses.`,
    examples: [
      {
        id: 1,
        inputText: "numCourses = 2, prerequisites = [[1,0]]",
        outputText: "true",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function canFinish(numCourses, prerequisites) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    bool canFinish(int numCourses, vector<vector<int>>& prerequisites) {
        
    }
};`,
      c: `bool canFinish(int numCourses, int** prerequisites, int prerequisitesSize, int* prerequisitesColSize) {
    
}`,
      python: `class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        `,
      java: `class Solution {
    public boolean canFinish(int numCourses, int[][] prerequisites) {
        
    }
}`
    },
    handlerFunction: "canFinish",
    testCases: [
      { input: [2, [[1,0]]], expected: true }
    ]
  },

  // 77. Kth Smallest Element in a BST
  {
    id: "kth-smallest-bst",
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Tree",
    order: 77,
    videoId: "",
    description: `Given the root of a binary search tree, and an integer k, return the kth smallest value (1-indexed) of all the values of the nodes in the tree.`,
    examples: [
      {
        id: 1,
        inputText: "root = [3,1,4,null,2], k = 1",
        outputText: "1",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function kthSmallest(root, k) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int kthSmallest(TreeNode* root, int k) {
        
    }
};`,
      c: `int kthSmallest(struct TreeNode* root, int k) {
    
}`,
      python: `class Solution:
    def kthSmallest(self, root: Optional[TreeNode], k: int) -> int:
        `,
      java: `class Solution {
    public int kthSmallest(TreeNode root, int k) {
        
    }
}`
    },
    handlerFunction: "kthSmallest",
    testCases: [
      { input: [[3,1,4,null,2], 1], expected: 1 }
    ]
  },

  // 78. Palindromic Substrings
  {
    id: "palindromic-substrings",
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "DP",
    order: 78,
    videoId: "",
    description: `Given a string \`s\`, return the number of palindromic substrings in it.`,
    examples: [
      {
        id: 1,
        inputText: 's = "abc"',
        outputText: "3",
        explanation: "Three palindromic strings: \"a\", \"b\", \"c\"."
      }
    ],
    starterCode: {
      javascript: `function countSubstrings(s) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    int countSubstrings(string s) {
        
    }
};`,
      c: `int countSubstrings(char* s) {
    
}`,
      python: `class Solution:
    def countSubstrings(self, s: str) -> int:
        `,
      java: `class Solution {
    public int countSubstrings(String s) {
        
    }
}`
    },
    handlerFunction: "countSubstrings",
    testCases: [
      { input: ["abc"], expected: 3 }
    ]
  },

  // 79. Daily Temperatures
  {
    id: "daily-temperatures",
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    order: 79,
    videoId: "",
    description: `Given an array of integers \`temperatures\` represents the daily temperatures, return an array \`answer\` such that \`answer[i]\` is the number of days you have to wait after the \`ith\` day to get a warmer temperature.`,
    examples: [
      {
        id: 1,
        inputText: "temperatures = [73,74,75,71,69,72,76,73]",
        outputText: "[1,1,4,2,1,1,0,0]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `function dailyTemperatures(temperatures) {
  // Write your code here
};`,
      cpp: `class Solution {
public:
    vector<int> dailyTemperatures(vector<int>& temperatures) {
        
    }
};`,
      c: `/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* dailyTemperatures(int* temperatures, int temperaturesSize, int* returnSize) {
    
}`,
      python: `class Solution:
    def dailyTemperatures(self, temperatures: List[int]) -> List[int]:
        `,
      java: `class Solution {
    public int[] dailyTemperatures(int[] temperatures) {
        
    }
}`
    },
    handlerFunction: "dailyTemperatures",
    testCases: [
      { input: [[73,74,75,71,69,72,76,73]], expected: [1,1,4,2,1,1,0,0] }
    ]
  },

  // 80. Min Stack
  {
    id: "min-stack",
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    order: 80,
    videoId: "",
    description: `Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.`,
    examples: [
      {
        id: 1,
        inputText: '["MinStack","push","push","push","getMin","pop","top","getMin"]\n[[],[-2],[0],[-3],[],[],[],[]]',
        outputText: "[null,null,null,null,-3,null,0,-2]",
        explanation: ""
      }
    ],
    starterCode: {
      javascript: `
var MinStack = function() {
    
};

/** * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function(val) {
    
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    
};`,
      cpp: `class MinStack {
public:
    MinStack() {
        
    }
    
    void push(int val) {
        
    }
    
    void pop() {
        
    }
    
    int top() {
        
    }
    
    int getMin() {
        
    }
};`,
      c: `typedef struct {
    
} MinStack;

MinStack* minStackCreate() {
    
}

void minStackPush(MinStack* obj, int val) {
    
}

void minStackPop(MinStack* obj) {
    
}

int minStackTop(MinStack* obj) {
    
}

int minStackGetMin(MinStack* obj) {
    
}

void minStackFree(MinStack* obj) {
    
}`,
      python: `class MinStack:

    def __init__(self):
        

    def push(self, val: int) -> None:
        

    def pop(self) -> None:
        

    def top(self) -> int:
        

    def getMin(self) -> int:
        `,
      java: `class MinStack {

    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        
    }
    
    public int getMin() {
        
    }
}`
    },
    handlerFunction: "MinStack",
    testCases: []
  }

];

export const LANGUAGE_CONFIG = {
  javascript: {
    name: "JavaScript",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    monacoLang: "javascript",
  },
  python: {
    name: "Python",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
    monacoLang: "python",
  },
  java: {
    name: "Java",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
    monacoLang: "java",
  },
  cpp: {
    name: "C++",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
    monacoLang: "cpp",
  },
  c: {
    name: "C",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg",
    monacoLang: "c",
  },
};

export const PROBLEMS = problems.reduce((acc, problem) => {
  acc[problem.id] = problem;
  return acc;
}, {});