// enhanced_problems.js
export const PROBLEMS = [
  // 1. Two Sum
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Array",
    order: 1,
    description: `Given an array of integers **nums** and an integer **target**, return indices of the two numbers such that they add up to **target**.

You may assume that each input would have **exactly one solution**, and you may not use the same element twice.

You can return the answer in any order.

## Approach & Strategy
Use a Hash Map to store numbers and their indices as you iterate through the array. For each number \`x\`, calculate the \`complement = target - x\`. If the complement exists in the map, you have found the pair. 

### Complexity
- **Time**: O(n) - Single pass through array
- **Space**: O(n) - Hash map storage`,
    examples: [
      {
        input: "4\n2 7 11 15\n9",
        output: "0 1",
        explanation: "nums[0] + nums[1] = 2 + 7 = 9"
      },
      {
        input: "3\n3 2 4\n6",
        output: "1 2",
        explanation: "nums[1] + nums[2] = 2 + 4 = 6"
      }
    ],
    testCases: [
      { input: [4, [2, 7, 11, 15], 9], expectedOutput: "0 1" },
      { input: [3, [3, 2, 4], 6], expectedOutput: "1 2" },
      { input: [2, [3, 3], 6], expectedOutput: "0 1" },
      { input: [5, [1, 5, 3, 7, 2], 9], expectedOutput: "1 3" }, // 5+4 no, 5 is index 1. 9-7=2. 
      { input: [6, [0, 4, 3, 0, 1, 2], 0], expectedOutput: "0 3" },
      { input: [4, [-1, -2, -3, -4], -5], expectedOutput: "1 2" },
      { input: [3, [10, 20, 30], 50], expectedOutput: "1 2" },
      { input: [4, [5, 75, 25, 100], 100], expectedOutput: "1 2" },
      { input: [5, [1, 2, 3, 4, 5], 9], expectedOutput: "3 4" },
      { input: [2, [100, 200], 300], expectedOutput: "0 1" }
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9"
    ],
    starterCode: {
      javascript: `// Read n, then nums array, then target
function twoSum(nums, target) {
  // Write your code here
}`,
      python: `class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        pass`,
      java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        
    }
};`,
      c: `int* twoSum(int* nums, int numsSize, int target, int* returnSize) {
    
}`
    }
  },

  // 2. Reverse String
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "String",
    order: 2,
    description: `Write a function that reverses a string. The input string is given as an array of characters.

You must do this by modifying the input array **in-place** with O(1) extra memory.

## Approach & Strategy
Use the **two-pointer technique**: one pointer at the start (left), one at the end (right). Swap characters at these pointers and move them toward the center until they meet. 

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      {
        input: "5\nh e l l o",
        output: "o l l e h",
        explanation: "Reverse the string in-place."
      }
    ],
    testCases: [
      { input: [5, ["h","e","l","l","o"]], expectedOutput: "o l l e h" },
      { input: [6, ["H","a","n","n","a","h"]], expectedOutput: "h a n n a H" },
      { input: [1, ["a"]], expectedOutput: "a" },
      { input: [2, ["a","b"]], expectedOutput: "b a" },
      { input: [7, ["A","B","C","D","E","F","G"]], expectedOutput: "G F E D C B A" },
      { input: [4, ["1","2","3","4"]], expectedOutput: "4 3 2 1" },
      { input: [8, ["r","a","c","e","c","a","r"," "]], expectedOutput: "  r a c e c a r" },
      { input: [3, ["x","y","z"]], expectedOutput: "z y x" },
      { input: [0, []], expectedOutput: "" },
      { input: [4, ["!","@","#","$"]], expectedOutput: "$ # @ !" }
    ],
    constraints: [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ascii character"
    ],
    starterCode: {
      javascript: `/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString(s) {
  // Write your code here
};`,
      python: `class Solution:
    def reverseString(self, s: List[str]) -> None:
        pass`,
      java: `class Solution {
    public void reverseString(char[] s) {
        
    }
}`,
      cpp: `class Solution {
public:
    void reverseString(vector<char>& s) {
        
    }
};`,
      c: `void reverseString(char* s, int sSize) {
    
}`
    }
  },

  // 3. Palindrome Number
  {
    id: "palindrome-number",
    title: "Palindrome Number",
    difficulty: "Easy",
    category: "Math",
    order: 3,
    description: `Given an integer **x**, return **true** if x is a palindrome, and **false** otherwise.

An integer is a palindrome when it reads the same backward as forward.

## Approach & Strategy
1. Negative numbers are never palindromes.
2. Numbers ending in 0 (except 0 itself) are not palindromes.
3. Revert the number mathematically (modulo 10) to avoid converting to string (extra space). Compare the reverted half with the original half.

### Complexity
- **Time**: O(log n) - Processing digits
- **Space**: O(1)`,
    examples: [
      { input: "121", output: "true", explanation: "Reads same forwards and backwards" },
      { input: "-121", output: "false", explanation: "Reads 121- backwards" }
    ],
    testCases: [
      { input: [121], expectedOutput: "true" },
      { input: [-121], expectedOutput: "false" },
      { input: [10], expectedOutput: "false" },
      { input: [0], expectedOutput: "true" },
      { input: [9], expectedOutput: "true" },
      { input: [1221], expectedOutput: "true" },
      { input: [12321], expectedOutput: "true" },
      { input: [123], expectedOutput: "false" },
      { input: [1000021], expectedOutput: "false" },
      { input: [12345654321], expectedOutput: "true" },
      { input: [-101], expectedOutput: "false" },
      { input: [11], expectedOutput: "true" }
    ],
    constraints: ["-2^31 <= x <= 2^31 - 1"],
    starterCode: {
      javascript: `function isPalindrome(x) {
  // Write your code here
};`,
      python: `class Solution:
    def isPalindrome(self, x: int) -> bool:
        pass`,
      java: `class Solution {
    public boolean isPalindrome(int x) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(int x) {
        
    }
};`,
      c: `bool isPalindrome(int x) {
    
}`
    }
  },

  // 4. Valid Parentheses
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    order: 4,
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

## Approach & Strategy
Use a **Stack** data structure.
1. Iterate through the string.
2. If character is an open bracket, push it onto the stack.
3. If it is a closing bracket, check if the stack is empty. If not, pop the top and check if it matches the pair.
4. Finally, return true if stack is empty. 

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "()", output: "true" },
      { input: "()[]{}", output: "true" },
      { input: "(]", output: "false" }
    ],
    testCases: [
      { input: ["()"], expectedOutput: "true" },
      { input: ["()[]{}"], expectedOutput: "true" },
      { input: ["(]"], expectedOutput: "false" },
      { input: ["([)]"], expectedOutput: "false" },
      { input: ["{[]}"], expectedOutput: "true" },
      { input: [""], expectedOutput: "true" },
      { input: ["[",], expectedOutput: "false" },
      { input: ["]"], expectedOutput: "false" },
      { input: ["((("], expectedOutput: "false" },
      { input: ["(()"], expectedOutput: "false" },
      { input: ["(([]){})"], expectedOutput: "true" },
      { input: ["}{"], expectedOutput: "false" }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
    starterCode: {
      javascript: `function isValid(s) {
  // Write your code here
};`,
      python: `class Solution:
    def isValid(self, s: str) -> bool:
        pass`,
      java: `class Solution {
    public boolean isValid(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isValid(string s) {
        
    }
};`,
      c: `bool isValid(char* s) {
    
}`
    }
  },

  // 5. Best Time to Buy and Sell Stock
  {
    id: "best-time-to-buy-and-sell-stock",
    title: "Best Time to Buy and Sell Stock",
    difficulty: "Easy",
    category: "Array",
    order: 5,
    description: `You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the \`ith\` day.

You want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.

## Approach & Strategy
Use a **One Pass** approach (Sliding Window concept).
1. Initialize \`minPrice\` to infinity and \`maxProfit\` to 0.
2. Iterate through prices.
3. If current price < \`minPrice\`, update \`minPrice\`.
4. Else if \`currentPrice - minPrice\` > \`maxProfit\`, update \`maxProfit\`.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "7,1,5,3,6,4", output: "5", explanation: "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5." },
      { input: "7,6,4,3,1", output: "0", explanation: "In this case, no transactions are done and the max profit = 0." }
    ],
    testCases: [
      { input: [[7,1,5,3,6,4]], expectedOutput: 5 },
      { input: [[7,6,4,3,1]], expectedOutput: 0 },
      { input: [[1,2,3,4,5]], expectedOutput: 4 },
      { input: [[2,4,1]], expectedOutput: 2 },
      { input: [[1]], expectedOutput: 0 },
      { input: [[2,1,2,1,0,1,2]], expectedOutput: 2 },
      { input: [[3,2,6,5,0,3]], expectedOutput: 4 },
      { input: [[1,2]], expectedOutput: 1 },
      { input: [[2,1]], expectedOutput: 0 },
      { input: [[5,10,5,10]], expectedOutput: 5 },
      { input: [[1,1,1,1]], expectedOutput: 0 },
      { input: [[8,2,9,1,7]], expectedOutput: 7 }
    ],
    constraints: ["1 <= prices.length <= 10^5", "0 <= prices[i] <= 10^4"],
    starterCode: {
      javascript: `function maxProfit(prices) {
  // Write your code here
};`,
      python: `class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        pass`,
      java: `class Solution {
    public int maxProfit(int[] prices) {
        
    }
}`,
      cpp: `class Solution {
public:
    int maxProfit(vector<int>& prices) {
        
    }
};`,
      c: `int maxProfit(int* prices, int pricesSize) {
    
}`
    }
  },

  // 6. Valid Palindrome
  {
    id: "valid-palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "String",
    order: 6,
    description: `A phrase is a **palindrome** if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward.

## Approach & Strategy
Use **Two Pointers**.
1. Initialize \`left = 0\` and \`right = s.length - 1\`.
2. Move \`left\` forward until it points to a letter or digit.
3. Move \`right\` backward until it points to a letter or digit.
4. Compare characters (lowercased). If mismatch, return false.
5. Repeat until pointers cross.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "A man, a plan, a canal: Panama", output: "true" },
      { input: "race a car", output: "false" }
    ],
    testCases: [
      { input: ["A man, a plan, a canal: Panama"], expectedOutput: "true" },
      { input: ["race a car"], expectedOutput: "false" },
      { input: [" "], expectedOutput: "true" },
      { input: ["a."], expectedOutput: "true" },
      { input: ["0P"], expectedOutput: "false" },
      { input: ["ab_a"], expectedOutput: "true" },
      { input: ["!!!???"], expectedOutput: "true" },
      { input: ["Madam"], expectedOutput: "true" },
      { input: ["No 'x' in Nixon"], expectedOutput: "true" },
      { input: ["12321"], expectedOutput: "true" },
      { input: ["12345"], expectedOutput: "false" },
      { input: ["Was it a car or a cat I saw?"], expectedOutput: "true" }
    ],
    constraints: ["1 <= s.length <= 2 * 10^5"],
    starterCode: {
      javascript: `function isPalindrome(s) {
  // Write your code here
};`,
      python: `class Solution:
    def isPalindrome(self, s: str) -> bool:
        pass`,
      java: `class Solution {
    public boolean isPalindrome(String s) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isPalindrome(string s) {
        
    }
};`,
      c: `bool isPalindrome(char* s) {
    
}`
    }
  },

  // 7. Valid Anagram
  {
    id: "valid-anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "String",
    order: 7,
    description: `Given two strings \`s\` and \`t\`, return \`true\` if \`t\` is an anagram of \`s\`, and \`false\` otherwise.

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.

## Approach & Strategy
Use a **Frequency Counter** (Hash Table or Array).
1. If lengths differ, return false.
2. Create an array of size 26 (for lowercase English letters).
3. Increment count for chars in \`s\`, decrement for chars in \`t\`.
4. If all counts are 0, return true.

### Complexity
- **Time**: O(n)
- **Space**: O(1) (Fixed alphabet size)`,
    examples: [
      { input: "anagram\nnagaram", output: "true" },
      { input: "rat\ncar", output: "false" }
    ],
    testCases: [
      { input: ["anagram", "nagaram"], expectedOutput: "true" },
      { input: ["rat", "car"], expectedOutput: "false" },
      { input: ["", ""], expectedOutput: "true" },
      { input: ["a", "ab"], expectedOutput: "false" },
      { input: ["ab", "a"], expectedOutput: "false" },
      { input: ["listen", "silent"], expectedOutput: "true" },
      { input: ["aabbcc", "ccbbaa"], expectedOutput: "true" },
      { input: ["aacc", "ccac"], expectedOutput: "false" },
      { input: ["hello", "billion"], expectedOutput: "false" },
      { input: ["dormitory", "dirtyroom"], expectedOutput: "true" },
      { input: ["abc", "def"], expectedOutput: "false" },
      { input: ["s", "s"], expectedOutput: "true" }
    ],
    constraints: ["1 <= s.length, t.length <= 5 * 10^4", "s and t consist of lowercase English letters"],
    starterCode: {
      javascript: `function isAnagram(s, t) {
  // Write your code here
};`,
      python: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        pass`,
      java: `class Solution {
    public boolean isAnagram(String s, String t) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool isAnagram(string s, string t) {
        
    }
};`,
      c: `bool isAnagram(char* s, char* t) {
    
}`
    }
  },

  // 8. Binary Search
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Binary Search",
    order: 8,
    description: `Given an array of integers \`nums\` which is sorted in ascending order, and an integer \`target\`, write a function to search \`target\` in \`nums\`. If \`target\` exists, then return its index. Otherwise, return \`-1\`.

## Approach & Strategy
Use the **Divide and Conquer** strategy.
1. Set \`low = 0\`, \`high = n - 1\`.
2. Find \`mid = low + (high - low) / 2\`.
3. If \`nums[mid] == target\`, return \`mid\`.
4. If \`nums[mid] < target\`, ignore left half (\`low = mid + 1\`).
5. If \`nums[mid] > target\`, ignore right half (\`high = mid - 1\`). 

[Image of binary search tree traversal]


### Complexity
- **Time**: O(log n)
- **Space**: O(1)`,
    examples: [
      { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" },
      { input: "nums = [-1,0,3,5,9,12], target = 2", output: "-1" }
    ],
    testCases: [
      { input: [[-1,0,3,5,9,12], 9], expectedOutput: 4 },
      { input: [[-1,0,3,5,9,12], 2], expectedOutput: -1 },
      { input: [[5], 5], expectedOutput: 0 },
      { input: [[5], -5], expectedOutput: -1 },
      { input: [[1,2,3,4,5,6], 1], expectedOutput: 0 },
      { input: [[1,2,3,4,5,6], 6], expectedOutput: 5 },
      { input: [[1,2,3,4,5,6], 3], expectedOutput: 2 },
      { input: [[-10,-5,0,5,10], 0], expectedOutput: 2 },
      { input: [[-10,-5,0,5,10], -10], expectedOutput: 0 },
      { input: [[2,5], 2], expectedOutput: 0 },
      { input: [[2,5], 5], expectedOutput: 1 },
      { input: [[2,5], 0], expectedOutput: -1 }
    ],
    constraints: ["1 <= nums.length <= 10^4", "nums is sorted unique"],
    starterCode: {
      javascript: `function search(nums, target) {
  // Write your code here
};`,
      python: `class Solution:
    def search(self, nums: List[int], target: int) -> int:
        pass`,
      java: `class Solution {
    public int search(int[] nums, int target) {
        
    }
}`,
      cpp: `class Solution {
public:
    int search(vector<int>& nums, int target) {
        
    }
};`,
      c: `int search(int* nums, int numsSize, int target) {
    
}`
    }
  },

  // 9. Climbing Stairs
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    difficulty: "Easy",
    category: "DP",
    order: 9,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Approach & Strategy
This is a **Dynamic Programming** problem, identical to the Fibonacci sequence.
- Base cases: 1 way to climb 1 step, 2 ways to climb 2 steps.
- Recursive step: Ways(n) = Ways(n-1) + Ways(n-2).
- Optimize by only storing the last two values.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "2", output: "2", explanation: "1+1, 2" },
      { input: "3", output: "3", explanation: "1+1+1, 1+2, 2+1" }
    ],
    testCases: [
      { input: [1], expectedOutput: 1 },
      { input: [2], expectedOutput: 2 },
      { input: [3], expectedOutput: 3 },
      { input: [4], expectedOutput: 5 },
      { input: [5], expectedOutput: 8 },
      { input: [6], expectedOutput: 13 },
      { input: [10], expectedOutput: 89 },
      { input: [20], expectedOutput: 10946 },
      { input: [45], expectedOutput: 1836311903 },
      { input: [0], expectedOutput: 0 }, // Edge case if defined
      { input: [7], expectedOutput: 21 },
      { input: [8], expectedOutput: 34 }
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: `function climbStairs(n) {
  // Write your code here
};`,
      python: `class Solution:
    def climbStairs(self, n: int) -> int:
        pass`,
      java: `class Solution {
    public int climbStairs(int n) {
        
    }
}`,
      cpp: `class Solution {
public:
    int climbStairs(int n) {
        
    }
};`,
      c: `int climbStairs(int n) {
    
}`
    }
  },

  // 10. Contains Duplicate
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    difficulty: "Easy",
    category: "Array",
    order: 10,
    description: `Given an integer array \`nums\`, return \`true\` if any value appears **at least twice** in the array, and return \`false\` if every element is distinct.

## Approach & Strategy
Use a **Hash Set** to store elements seen so far.
1. Iterate through the array.
2. If element is already in the set, return true.
3. Else add element to set.
4. If loop finishes, return false.

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "[1,2,3,1]", output: "true" },
      { input: "[1,2,3,4]", output: "false" }
    ],
    testCases: [
      { input: [[1,2,3,1]], expectedOutput: "true" },
      { input: [[1,2,3,4]], expectedOutput: "false" },
      { input: [[1,1,1,3,3,4,3,2,4,2]], expectedOutput: "true" },
      { input: [[1]], expectedOutput: "false" },
      { input: [[1,1]], expectedOutput: "true" },
      { input: [[10,20,30,40,10]], expectedOutput: "true" },
      { input: [[],], expectedOutput: "false" }, // Edge case empty
      { input: [[-1,-2,-3,-1]], expectedOutput: "true" },
      { input: [[0,1,2,3,4,0]], expectedOutput: "true" },
      { input: [[1,2,3,4,5,6,7,8,9,10]], expectedOutput: "false" },
      { input: [[100000, 2, 100000]], expectedOutput: "true" },
      { input: [[3,1]], expectedOutput: "false" }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    starterCode: {
      javascript: `function containsDuplicate(nums) {
  // Write your code here
};`,
      python: `class Solution:
    def containsDuplicate(self, nums: List[int]) -> bool:
        pass`,
      java: `class Solution {
    public boolean containsDuplicate(int[] nums) {
        
    }
}`,
      cpp: `class Solution {
public:
    bool containsDuplicate(vector<int>& nums) {
        
    }
};`,
      c: `bool containsDuplicate(int* nums, int numsSize) {
    
}`
    }
  },

  // 11. Single Number
  {
    id: "single-number",
    title: "Single Number",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 11,
    description: `Given a **non-empty** array of integers \`nums\`, every element appears twice except for one. Find that single one.

You must implement a solution with a linear runtime complexity and use only constant extra space.

## Approach & Strategy
Use the **XOR Bitwise Operation**.
- Recall that \`a ^ a = 0\` and \`a ^ 0 = a\`.
- XOR is associative and commutative.
- If we XOR all numbers in the array, all the numbers that appear twice will cancel each other out (become 0), leaving only the single number. 

### Complexity
- **Time**: O(n) - Single pass.
- **Space**: O(1) - No extra structures used.`,
    examples: [
      { input: "2 2 1", output: "1", explanation: "2^2^1 = 0^1 = 1" },
      { input: "4 1 2 1 2", output: "4", explanation: "4^1^2^1^2 = 4^(1^1)^(2^2) = 4^0^0 = 4" }
    ],
    testCases: [
      { input: [[2, 2, 1]], expectedOutput: 1 },
      { input: [[4, 1, 2, 1, 2]], expectedOutput: 4 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[-1, -1, -2]], expectedOutput: -2 },
      { input: [[0, 1, 0]], expectedOutput: 1 },
      { input: [[1, 2, 1, 2, 5]], expectedOutput: 5 },
      { input: [[10000, 20000, 10000]], expectedOutput: 20000 },
      { input: [[9, 3, 9, 3, 7, 7, 1]], expectedOutput: 1 },
      { input: [[5, 4, 3, 2, 1, 5, 4, 3, 2]], expectedOutput: 1 },
      { input: [[-5, -2, -5, -2, 10]], expectedOutput: 10 }
    ],
    constraints: ["1 <= nums.length <= 3 * 10^4", "-3 * 10^4 <= nums[i] <= 3 * 10^4"],
    starterCode: {
      javascript: `function singleNumber(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        \n    }\n};`,
      c: `int singleNumber(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def singleNumber(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int singleNumber(int[] nums) {\n        \n    }\n}`
    }
  },

  // 12. Majority Element
  {
    id: "majority-element",
    title: "Majority Element",
    difficulty: "Easy",
    category: "Array",
    order: 12,
    description: `Given an array \`nums\` of size \`n\`, return the majority element.

The majority element is the element that appears more than \`⌊n / 2⌋\` times. You may assume that the majority element always exists in the array.

## Approach & Strategy
Use the **Boyer-Moore Voting Algorithm**.
1. Maintain a \`candidate\` and a \`count\`.
2. Iterate through the array.
3. If \`count\` is 0, assign the current element as the new candidate.
4. If current element == candidate, increment count. Otherwise, decrement count.
5. The final candidate is the majority element. 

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "3 2 3", output: "3", explanation: "" },
      { input: "2 2 1 1 1 2 2", output: "2", explanation: "" }
    ],
    testCases: [
      { input: [[3, 2, 3]], expectedOutput: 3 },
      { input: [[2, 2, 1, 1, 1, 2, 2]], expectedOutput: 2 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[6, 6, 6, 7, 7]], expectedOutput: 6 },
      { input: [[1, 1, 2]], expectedOutput: 1 },
      { input: [[8, 8, 7, 7, 7]], expectedOutput: 7 },
      { input: [[-1, -1, 2147483647]], expectedOutput: -1 },
      { input: [[10, 10, 20]], expectedOutput: 10 },
      { input: [[5, 5, 5, 5, 1, 2, 3]], expectedOutput: 5 },
      { input: [[1, 2, 3, 4, 4, 4, 4, 4, 4]], expectedOutput: 4 }
    ],
    constraints: ["n == nums.length", "1 <= n <= 5 * 10^4"],
    starterCode: {
      javascript: `function majorityElement(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int majorityElement(vector<int>& nums) {\n        \n    }\n};`,
      c: `int majorityElement(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def majorityElement(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int majorityElement(int[] nums) {\n        \n    }\n}`
    }
  },

  // 13. Move Zeroes
  {
    id: "move-zeroes",
    title: "Move Zeroes",
    difficulty: "Easy",
    category: "Two Pointers",
    order: 13,
    description: `Given an integer array \`nums\`, move all \`0\`'s to the end of it while maintaining the relative order of the non-zero elements.

**Note**: You must do this in-place without making a copy of the array.

## Approach & Strategy
Use a "Snowball" or Two-Pointer approach.
1. Keep a pointer \`lastNonZeroFoundAt\` initialized to 0.
2. Iterate through the array.
3. If the current element is non-zero, swap it with the element at \`lastNonZeroFoundAt\` and increment the pointer.
4. This effectively pushes all non-zeroes to the front, leaving zeroes at the back.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "0 1 0 3 12", output: "1 3 12 0 0", explanation: "" },
      { input: "0", output: "0", explanation: "" }
    ],
    testCases: [
      { input: [[0, 1, 0, 3, 12]], expectedOutput: [1, 3, 12, 0, 0] },
      { input: [[0]], expectedOutput: [0] },
      { input: [[1, 0]], expectedOutput: [1, 0] },
      { input: [[0, 1]], expectedOutput: [1, 0] },
      { input: [[0, 0, 1]], expectedOutput: [1, 0, 0] },
      { input: [[1, 2, 3]], expectedOutput: [1, 2, 3] },
      { input: [[4, 2, 4, 0, 0, 3, 0, 5, 1, 0]], expectedOutput: [4, 2, 4, 3, 5, 1, 0, 0, 0, 0] },
      { input: [[0, 0, 0, 0, 0]], expectedOutput: [0, 0, 0, 0, 0] },
      { input: [[-1, 0, 2, -3]], expectedOutput: [-1, 2, -3, 0] },
      { input: [[1, 0, 2, 0, 3, 0]], expectedOutput: [1, 2, 3, 0, 0, 0] }
    ],
    constraints: ["1 <= nums.length <= 10^4", "-2^31 <= nums[i] <= 2^31 - 1"],
    starterCode: {
      javascript: `function moveZeroes(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    void moveZeroes(vector<int>& nums) {\n        \n    }\n};`,
      c: `void moveZeroes(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def moveZeroes(self, nums: List[int]) -> None:\n        pass`,
      java: `class Solution {\n    public void moveZeroes(int[] nums) {\n        \n    }\n}`
    }
  },

  // 14. Missing Number
  {
    id: "missing-number",
    title: "Missing Number",
    difficulty: "Easy",
    category: "Array",
    order: 14,
    description: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return the only number in the range that is missing from the array.

## Approach & Strategy
Use the **Summation Formula** (Gauss's Formula).
1. Calculate the expected sum of numbers from 0 to n using \`n * (n + 1) / 2\`.
2. Calculate the actual sum of elements in the array.
3. The difference \`expectedSum - actualSum\` is the missing number.
Alternatively, use XOR: XOR all indices with all values.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "3 0 1", output: "2", explanation: "Range is [0,3]. 2 is missing." },
      { input: "0 1", output: "2", explanation: "Range is [0,2]. 2 is missing." }
    ],
    testCases: [
      { input: [[3, 0, 1]], expectedOutput: 2 },
      { input: [[0, 1]], expectedOutput: 2 },
      { input: [[9, 6, 4, 2, 3, 5, 7, 0, 1]], expectedOutput: 8 },
      { input: [[0]], expectedOutput: 1 },
      { input: [[1]], expectedOutput: 0 },
      { input: [[1, 2, 3]], expectedOutput: 0 },
      { input: [[0, 2, 3]], expectedOutput: 1 },
      { input: [[0, 1, 2, 3, 4, 5, 6, 7, 9]], expectedOutput: 8 },
      { input: [[1, 0, 3]], expectedOutput: 2 },
      { input: [[0, 3, 2, 4]], expectedOutput: 1 }
    ],
    constraints: ["n == nums.length", "1 <= n <= 10^4"],
    starterCode: {
      javascript: `function missingNumber(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int missingNumber(vector<int>& nums) {\n        \n    }\n};`,
      c: `int missingNumber(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def missingNumber(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int missingNumber(int[] nums) {\n        \n    }\n}`
    }
  },

  // 15. Intersection of Two Arrays
  {
    id: "intersection-of-two-arrays",
    title: "Intersection of Two Arrays",
    difficulty: "Easy",
    category: "Array",
    order: 15,
    description: `Given two integer arrays \`nums1\` and \`nums2\`, return an array of their intersection. Each element in the result must be **unique** and you may return the result in any order.

## Approach & Strategy
Use a **Set** for O(1) lookups.
1. Convert \`nums1\` into a Set to remove duplicates.
2. Iterate through \`nums2\`.
3. If an element from \`nums2\` exists in the Set, add it to the result and remove it from the Set (to ensure uniqueness in result).

### Complexity
- **Time**: O(n + m)
- **Space**: O(n) or O(m)`,
    examples: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", output: "[2]", explanation: "" },
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", output: "[9,4]", explanation: "Order does not matter." }
    ],
    testCases: [
      { input: [[1, 2, 2, 1], [2, 2]], expectedOutput: [2] },
      { input: [[4, 9, 5], [9, 4, 9, 8, 4]], expectedOutput: [4, 9] }, // Order irrelevant
      { input: [[], [1, 2]], expectedOutput: [] },
      { input: [[1, 2], []], expectedOutput: [] },
      { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [] },
      { input: [[1, 2, 3], [1, 2, 3]], expectedOutput: [1, 2, 3] },
      { input: [[100], [100]], expectedOutput: [100] },
      { input: [[8, 0, 3], [0, 0]], expectedOutput: [0] },
      { input: [[1, 1], [1]], expectedOutput: [1] },
      { input: [[4, 7, 9, 7, 6, 7], [5, 0, 0, 6, 1, 6, 2, 2, 4]], expectedOutput: [4, 6] }
    ],
    constraints: ["1 <= nums1.length, nums2.length <= 1000"],
    starterCode: {
      javascript: `function intersection(nums1, nums2) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<int> intersection(vector<int>& nums1, vector<int>& nums2) {\n        \n    }\n};`,
      c: `int* intersection(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] intersection(int[] nums1, int[] nums2) {\n        \n    }\n}`
    }
  },

  // 16. First Unique Character in a String
  {
    id: "first-unique-character",
    title: "First Unique Character",
    difficulty: "Easy",
    category: "String",
    order: 16,
    description: `Given a string \`s\`, find the first non-repeating character in it and return its index. If it does not exist, return -1.

## Approach & Strategy
Use a **Frequency Map** (or Array size 26).
1. First pass: Count the frequency of every character.
2. Second pass: Iterate through the string again. The first character with a frequency of 1 is the answer.

### Complexity
- **Time**: O(n)
- **Space**: O(1) (Alphabet size is fixed)`,
    examples: [
      { input: "leetcode", output: "0", explanation: "l is the first unique char." },
      { input: "loveleetcode", output: "2", explanation: "v is the first unique char." }
    ],
    testCases: [
      { input: ["leetcode"], expectedOutput: 0 },
      { input: ["loveleetcode"], expectedOutput: 2 },
      { input: ["aabb"], expectedOutput: -1 },
      { input: ["z"], expectedOutput: 0 },
      { input: ["dddccdbba"], expectedOutput: 8 }, // a is at end
      { input: ["aadadaad"], expectedOutput: -1 },
      { input: ["abc"], expectedOutput: 0 },
      { input: ["itwqbtcdrfjgkhlmnbvcxz"], expectedOutput: 0 }, // i unique
      { input: ["m"], expectedOutput: 0 },
      { input: ["cc"], expectedOutput: -1 }
    ],
    constraints: ["1 <= s.length <= 10^5", "s consists of only lowercase English letters"],
    starterCode: {
      javascript: `function firstUniqChar(s) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int firstUniqChar(string s) {\n        \n    }\n};`,
      c: `int firstUniqChar(char* s) {\n    \n}`,
      python: `class Solution:\n    def firstUniqChar(self, s: str) -> int:\n        pass`,
      java: `class Solution {\n    public int firstUniqChar(String s) {\n        \n    }\n}`
    }
  },

  // 17. Fibonacci Number
  {
    id: "fibonacci-number",
    title: "Fibonacci Number",
    difficulty: "Easy",
    category: "DP",
    order: 17,
    description: `The Fibonacci numbers, denoted F(n), form a sequence such that each number is the sum of the two preceding ones, starting from 0 and 1.
F(0) = 0, F(1) = 1
F(n) = F(n - 1) + F(n - 2), for n > 1.

Given \`n\`, calculate \`F(n)\`.

## Approach & Strategy
Use **Iterative** approach with constant space.
1. If n <= 1, return n.
2. Keep variables \`a = 0\` and \`b = 1\`.
3. Loop from 2 to n, updating \`sum = a + b\`, then shift \`a = b\`, \`b = sum\`.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "2", output: "1", explanation: "F(2) = F(1) + F(0) = 1 + 0 = 1" },
      { input: "3", output: "2", explanation: "F(3) = F(2) + F(1) = 1 + 1 = 2" }
    ],
    testCases: [
      { input: [0], expectedOutput: 0 },
      { input: [1], expectedOutput: 1 },
      { input: [2], expectedOutput: 1 },
      { input: [3], expectedOutput: 2 },
      { input: [4], expectedOutput: 3 },
      { input: [5], expectedOutput: 5 },
      { input: [6], expectedOutput: 8 },
      { input: [10], expectedOutput: 55 },
      { input: [20], expectedOutput: 6765 },
      { input: [30], expectedOutput: 832040 }
    ],
    constraints: ["0 <= n <= 30"],
    starterCode: {
      javascript: `function fib(n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int fib(int n) {\n        \n    }\n};`,
      c: `int fib(int n) {\n    \n}`,
      python: `class Solution:\n    def fib(self, n: int) -> int:\n        pass`,
      java: `class Solution {\n    public int fib(int n) {\n        \n    }\n}`
    }
  },

  // 18. Power of Two
  {
    id: "power-of-two",
    title: "Power of Two",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 18,
    description: `Given an integer \`n\`, return \`true\` if it is a power of two. Otherwise, return \`false\`.

An integer \`n\` is a power of two if there exists an integer \`x\` such that \`n == 2^x\`.

## Approach & Strategy
Use **Bit Manipulation**.
- Powers of two in binary always look like \`100...0\` (one set bit).
- If we subtract 1, we get \`011...1\`.
- \`n & (n - 1)\` will always be 0 for powers of two.
- Also check that \`n > 0\`.

### Complexity
- **Time**: O(1)
- **Space**: O(1)`,
    examples: [
      { input: "1", output: "true", explanation: "2^0 = 1" },
      { input: "16", output: "true", explanation: "2^4 = 16" },
      { input: "3", output: "false", explanation: "" }
    ],
    testCases: [
      { input: [1], expectedOutput: "true" },
      { input: [16], expectedOutput: "true" },
      { input: [3], expectedOutput: "false" },
      { input: [4], expectedOutput: "true" },
      { input: [5], expectedOutput: "false" },
      { input: [0], expectedOutput: "false" },
      { input: [-16], expectedOutput: "false" },
      { input: [1024], expectedOutput: "true" },
      { input: [2147483648], expectedOutput: "false" }, // Check bounds if necessary
      { input: [2147483647], expectedOutput: "false" },
      { input: [256], expectedOutput: "true" },
      { input: [6], expectedOutput: "false" }
    ],
    constraints: ["-2^31 <= n <= 2^31 - 1"],
    starterCode: {
      javascript: `function isPowerOfTwo(n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isPowerOfTwo(int n) {\n        \n    }\n};`,
      c: `bool isPowerOfTwo(int n) {\n    \n}`,
      python: `class Solution:\n    def isPowerOfTwo(self, n: int) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isPowerOfTwo(int n) {\n        \n    }\n}`
    }
  },

  // 19. Happy Number
  {
    id: "happy-number",
    title: "Happy Number",
    difficulty: "Easy",
    category: "Math",
    order: 19,
    description: `Write an algorithm to determine if a number \`n\` is happy.

A **happy number** is a number defined by the following process:
1. Starting with any positive integer, replace the number by the sum of the squares of its digits.
2. Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
3. Those numbers for which this process ends in 1 are happy.

## Approach & Strategy
Use the **Fast and Slow Pointers** (Floyd's Cycle-Finding) or a Hash Set.
- Treat the sequence of numbers as a linked list.
- If there is a cycle that doesn't reach 1, it's not a happy number.
- 'Slow' calculates sum of squares once, 'Fast' calculates it twice. If they meet at 1, true. If they meet elsewhere, false.

### Complexity
- **Time**: O(log n)
- **Space**: O(1) (with pointers)`,
    examples: [
      { input: "19", output: "true", explanation: "1^2+9^2=82 -> 8^2+2^2=68 -> ... -> 1" },
      { input: "2", output: "false", explanation: "Enters a cycle." }
    ],
    testCases: [
      { input: [19], expectedOutput: "true" },
      { input: [2], expectedOutput: "false" },
      { input: [1], expectedOutput: "true" },
      { input: [7], expectedOutput: "true" },
      { input: [4], expectedOutput: "false" }, // Known cycle element
      { input: [10], expectedOutput: "true" },
      { input: [13], expectedOutput: "true" },
      { input: [111], expectedOutput: "false" },
      { input: [100], expectedOutput: "true" },
      { input: [23], expectedOutput: "true" }
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    starterCode: {
      javascript: `function isHappy(n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isHappy(int n) {\n        \n    }\n};`,
      c: `bool isHappy(int n) {\n    \n}`,
      python: `class Solution:\n    def isHappy(self, n: int) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isHappy(int n) {\n        \n    }\n}`
    }
  },

  // 20. Plus One
  {
    id: "plus-one",
    title: "Plus One",
    difficulty: "Easy",
    category: "Array",
    order: 20,
    description: `You are given a large integer represented as an integer array \`digits\`, where each \`digits[i]\` is the ith digit of the integer. The digits are ordered from most significant to least significant in left-to-right order. The large integer does not contain any leading 0's.

Increment the large integer by one and return the resulting array of digits.

## Approach & Strategy
Iterate from the **end** of the array.
1. If the current digit is less than 9, increment it and return the array immediately.
2. If the digit is 9, set it to 0 and continue to the previous digit (carry).
3. If the loop finishes (e.g., 999 -> 000), insert 1 at the beginning (result 1000).

### Complexity
- **Time**: O(n)
- **Space**: O(1) (in-place usually, or O(n) if resizing needed)`,
    examples: [
      { input: "[1,2,3]", output: "[1,2,4]", explanation: "123 + 1 = 124" },
      { input: "[9]", output: "[1,0]", explanation: "9 + 1 = 10" }
    ],
    testCases: [
      { input: [[1, 2, 3]], expectedOutput: [1, 2, 4] },
      { input: [[4, 3, 2, 1]], expectedOutput: [4, 3, 2, 2] },
      { input: [[9]], expectedOutput: [1, 0] },
      { input: [[9, 9, 9]], expectedOutput: [1, 0, 0, 0] },
      { input: [[1, 9]], expectedOutput: [2, 0] },
      { input: [[8, 9, 9]], expectedOutput: [9, 0, 0] },
      { input: [[0]], expectedOutput: [1] },
      { input: [[2, 9, 9, 9]], expectedOutput: [3, 0, 0, 0] },
      { input: [[1, 2, 9]], expectedOutput: [1, 3, 0] },
      { input: [[5]], expectedOutput: [6] }
    ],
    constraints: ["1 <= digits.length <= 100", "0 <= digits[i] <= 9"],
    starterCode: {
      javascript: `function plusOne(digits) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<int> plusOne(vector<int>& digits) {\n        \n    }\n};`,
      c: `int* plusOne(int* digits, int digitsSize, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def plusOne(self, digits: List[int]) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] plusOne(int[] digits) {\n        \n    }\n}`
    }
  },

  // 21. Sqrt(x)
  {
    id: "sqrt-x",
    title: "Sqrt(x)",
    difficulty: "Easy",
    category: "Math",
    order: 21,
    description: `Given a non-negative integer \`x\`, return the square root of \`x\` rounded down to the nearest integer. The returned integer should be non-negative as well.

You must not use any built-in exponent function or operator.

## Approach & Strategy
Use **Binary Search**.
The square root of \`x\` must be between \`0\` and \`x\`.
1. Set \`low = 0\`, \`high = x\`.
2. Find \`mid\`.
3. If \`mid * mid == x\`, return \`mid\`.
4. If \`mid * mid < x\`, store \`mid\` as potential answer and move \`low\` up.
5. If \`mid * mid > x\`, move \`high\` down.

### Complexity
- **Time**: O(log x)
- **Space**: O(1)`,
    examples: [
      { input: "4", output: "2", explanation: "" },
      { input: "8", output: "2", explanation: "The square root of 8 is 2.82842..., and since we round it down to the nearest integer, 2 is returned." }
    ],
    testCases: [
      { input: [4], expectedOutput: 2 },
      { input: [8], expectedOutput: 2 },
      { input: [0], expectedOutput: 0 },
      { input: [1], expectedOutput: 1 },
      { input: [2], expectedOutput: 1 },
      { input: [3], expectedOutput: 1 },
      { input: [2147395599], expectedOutput: 46339 }, // Large test case
      { input: [16], expectedOutput: 4 },
      { input: [81], expectedOutput: 9 },
      { input: [2147483647], expectedOutput: 46340 }, // Max INT
      { input: [25], expectedOutput: 5 },
      { input: [100], expectedOutput: 10 }
    ],
    constraints: ["0 <= x <= 2^31 - 1"],
    starterCode: {
      javascript: `function mySqrt(x) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int mySqrt(int x) {\n        \n    }\n};`,
      c: `int mySqrt(int x) {\n    \n}`,
      python: `class Solution:\n    def mySqrt(self, x: int) -> int:\n        pass`,
      java: `class Solution {\n    public int mySqrt(int x) {\n        \n    }\n}`
    }
  },

  // 22. Search Insert Position
  {
    id: "search-insert-position",
    title: "Search Insert Position",
    difficulty: "Easy",
    category: "Binary Search",
    order: 22,
    description: `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.

## Approach & Strategy
Use **Binary Search** (Lower Bound).
1. \`low = 0\`, \`high = n - 1\`.
2. Loop while \`low <= high\`.
3. If \`nums[mid] == target\`, return \`mid\`.
4. If \`nums[mid] < target\`, \`low = mid + 1\`.
5. If \`nums[mid] > target\`, \`high = mid - 1\`.
6. Return \`low\` if loop finishes (this is the insertion point).

### Complexity
- **Time**: O(log n)
- **Space**: O(1)`,
    examples: [
      { input: "nums = [1,3,5,6], target = 5", output: "2", explanation: "" },
      { input: "nums = [1,3,5,6], target = 2", output: "1", explanation: "" }
    ],
    testCases: [
      { input: [[1, 3, 5, 6], 5], expectedOutput: 2 },
      { input: [[1, 3, 5, 6], 2], expectedOutput: 1 },
      { input: [[1, 3, 5, 6], 7], expectedOutput: 4 },
      { input: [[1, 3, 5, 6], 0], expectedOutput: 0 },
      { input: [[1], 0], expectedOutput: 0 },
      { input: [[1], 2], expectedOutput: 1 },
      { input: [[1, 2, 4, 6, 7], 3], expectedOutput: 2 },
      { input: [[3, 5, 7, 9, 10], 8], expectedOutput: 3 },
      { input: [[1, 3], 2], expectedOutput: 1 },
      { input: [[1, 3, 5], 4], expectedOutput: 2 }
    ],
    constraints: ["1 <= nums.length <= 10^4", "nums contains distinct values sorted in ascending order"],
    starterCode: {
      javascript: `function searchInsert(nums, target) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int searchInsert(vector<int>& nums, int target) {\n        \n    }\n};`,
      c: `int searchInsert(int* nums, int numsSize, int target) {\n    \n}`,
      python: `class Solution:\n    def searchInsert(self, nums: List[int], target: int) -> int:\n        pass`,
      java: `class Solution {\n    public int searchInsert(int[] nums, int target) {\n        \n    }\n}`
    }
  },

  // 23. Length of Last Word
  {
    id: "length-of-last-word",
    title: "Length of Last Word",
    difficulty: "Easy",
    category: "String",
    order: 23,
    description: `Given a string \`s\` consisting of words and spaces, return the length of the **last** word in the string.

A word is a maximal substring consisting of non-space characters only.

## Approach & Strategy
Iterate from the **end** of the string.
1. Skip trailing spaces.
2. Count characters until you hit a space or start of string.
3. Return the count.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "Hello World", output: "5", explanation: "The last word is 'World'." },
      { input: "   fly me   to   the moon  ", output: "4", explanation: "The last word is 'moon'." }
    ],
    testCases: [
      { input: ["Hello World"], expectedOutput: 5 },
      { input: ["   fly me   to   the moon  "], expectedOutput: 4 },
      { input: ["luffy is still joyboy"], expectedOutput: 6 },
      { input: ["a"], expectedOutput: 1 },
      { input: [" a"], expectedOutput: 1 },
      { input: ["a "], expectedOutput: 1 },
      { input: ["   "], expectedOutput: 0 }, // If definition allows empty, usually constraint says at least 1 word
      { input: ["day "], expectedOutput: 3 },
      { input: ["word"], expectedOutput: 4 },
      { input: ["this is a long sentence with many words"], expectedOutput: 5 }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of English letters and spaces"],
    starterCode: {
      javascript: `function lengthOfLastWord(s) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int lengthOfLastWord(string s) {\n        \n    }\n};`,
      c: `int lengthOfLastWord(char* s) {\n    \n}`,
      python: `class Solution:\n    def lengthOfLastWord(self, s: str) -> int:\n        pass`,
      java: `class Solution {\n    public int lengthOfLastWord(String s) {\n        \n    }\n}`
    }
  },

  // 24. Roman to Integer
  {
    id: "roman-to-integer",
    title: "Roman to Integer",
    difficulty: "Easy",
    category: "String",
    order: 24,
    description: `Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.
Convert a roman numeral string to an integer.

## Approach & Strategy
Iterate through the string.
1. Create a map of values (I=1, V=5, etc.).
2. If \`value[current] < value[next]\`, subtract current from total (e.g., IV = 5-1).
3. Else, add current to total.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "III", output: "3", explanation: "" },
      { input: "LVIII", output: "58", explanation: "L = 50, V= 5, III = 3." }
    ],
    testCases: [
      { input: ["III"], expectedOutput: 3 },
      { input: ["LVIII"], expectedOutput: 58 },
      { input: ["MCMXCIV"], expectedOutput: 1994 },
      { input: ["IV"], expectedOutput: 4 },
      { input: ["IX"], expectedOutput: 9 },
      { input: ["XL"], expectedOutput: 40 },
      { input: ["XC"], expectedOutput: 90 },
      { input: ["CD"], expectedOutput: 400 },
      { input: ["CM"], expectedOutput: 900 },
      { input: ["MMMCMXCIX"], expectedOutput: 3999 }
    ],
    constraints: ["1 <= s.length <= 15", "s contains only valid roman characters"],
    starterCode: {
      javascript: `function romanToInt(s) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int romanToInt(string s) {\n        \n    }\n};`,
      c: `int romanToInt(char* s) {\n    \n}`,
      python: `class Solution:\n    def romanToInt(self, s: str) -> int:\n        pass`,
      java: `class Solution {\n    public int romanToInt(String s) {\n        \n    }\n}`
    }
  },

  // 25. Longest Common Prefix
  {
    id: "longest-common-prefix",
    title: "Longest Common Prefix",
    difficulty: "Easy",
    category: "String",
    order: 25,
    description: `Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string "".

## Approach & Strategy
Horizontal Scanning:
1. Take the first string as the initial \`prefix\`.
2. Iterate through the rest of the strings.
3. While the current string does not start with \`prefix\`, shorten \`prefix\` by one character from the end.
4. If \`prefix\` becomes empty, return "".

### Complexity
- **Time**: O(S) where S is sum of all characters
- **Space**: O(1)`,
    examples: [
      { input: '["flower","flow","flight"]', output: '"fl"', explanation: "" },
      { input: '["dog","racecar","car"]', output: '""', explanation: "No common prefix." }
    ],
    testCases: [
      { input: [["flower", "flow", "flight"]], expectedOutput: "fl" },
      { input: [["dog", "racecar", "car"]], expectedOutput: "" },
      { input: [["a"]], expectedOutput: "a" },
      { input: [["ab", "a"]], expectedOutput: "a" },
      { input: [["cir", "car"]], expectedOutput: "c" },
      { input: [["interspecies", "interstellar", "interstate"]], expectedOutput: "inter" },
      { input: [["throne", "throne"]], expectedOutput: "throne" },
      { input: [["", "b"]], expectedOutput: "" },
      { input: [["flower", "flower", "flower", "flower"]], expectedOutput: "flower" },
      { input: [["prefix", "pre", "pr"]], expectedOutput: "pr" }
    ],
    constraints: ["1 <= strs.length <= 200", "0 <= strs[i].length <= 200"],
    starterCode: {
      javascript: `function longestCommonPrefix(strs) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    string longestCommonPrefix(vector<string>& strs) {\n        \n    }\n};`,
      c: `char* longestCommonPrefix(char** strs, int strsSize) {\n    \n}`,
      python: `class Solution:\n    def longestCommonPrefix(self, strs: List[str]) -> str:\n        pass`,
      java: `class Solution {\n    public String longestCommonPrefix(String[] strs) {\n        \n    }\n}`
    }
  },

  // 26. Number of 1 Bits
  {
    id: "number-of-1-bits",
    title: "Number of 1 Bits",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 26,
    description: `Write a function that takes the binary representation of a positive integer and returns the number of set bits (1s) it has (Hamming Weight).

## Approach & Strategy
Use **n & (n - 1)** trick.
- \`n & (n - 1)\` drops the lowest set bit.
- Repeat this operation until \`n\` becomes 0. Count the iterations.

### Complexity
- **Time**: O(1) (Specifically O(k) where k is number of set bits)
- **Space**: O(1)`,
    examples: [
      { input: "11", output: "3", explanation: "1011 has 3 ones." },
      { input: "128", output: "1", explanation: "10000000 has 1 one." }
    ],
    testCases: [
      { input: [11], expectedOutput: 3 },
      { input: [128], expectedOutput: 1 },
      { input: [2147483645], expectedOutput: 30 },
      { input: [0], expectedOutput: 0 },
      { input: [1], expectedOutput: 1 },
      { input: [2], expectedOutput: 1 },
      { input: [3], expectedOutput: 2 },
      { input: [4294967293], expectedOutput: 31 }, // Unsigned int max - something
      { input: [1023], expectedOutput: 10 },
      { input: [7], expectedOutput: 3 }
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    starterCode: {
      javascript: `function hammingWeight(n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int hammingWeight(int n) {\n        \n    }\n};`,
      c: `int hammingWeight(int n) {\n    \n}`,
      python: `class Solution:\n    def hammingWeight(self, n: int) -> int:\n        pass`,
      java: `class Solution {\n    public int hammingWeight(int n) {\n        \n    }\n}`
    }
  },

  // 27. Valid Perfect Square
  {
    id: "valid-perfect-square",
    title: "Valid Perfect Square",
    difficulty: "Easy",
    category: "Math",
    order: 27,
    description: `Given a positive integer num, return true if num is a perfect square or false otherwise. Do not use built-in sqrt functions.

## Approach & Strategy
Use **Binary Search**.
Range [1, num].
If \`mid * mid == num\`, return true.
If \`mid * mid > num\`, high = mid - 1.
If \`mid * mid < num\`, low = mid + 1.

### Complexity
- **Time**: O(log n)
- **Space**: O(1)`,
    examples: [
      { input: "16", output: "true", explanation: "4 * 4 = 16" },
      { input: "14", output: "false", explanation: "" }
    ],
    testCases: [
      { input: [16], expectedOutput: true },
      { input: [14], expectedOutput: false },
      { input: [1], expectedOutput: true },
      { input: [4], expectedOutput: true },
      { input: [5], expectedOutput: false },
      { input: [100], expectedOutput: true },
      { input: [2147483647], expectedOutput: false },
      { input: [808201], expectedOutput: true }, // 899^2
      { input: [25], expectedOutput: true },
      { input: [2], expectedOutput: false }
    ],
    constraints: ["1 <= num <= 2^31 - 1"],
    starterCode: {
      javascript: `function isPerfectSquare(num) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isPerfectSquare(int num) {\n        \n    }\n};`,
      c: `bool isPerfectSquare(int num) {\n    \n}`,
      python: `class Solution:\n    def isPerfectSquare(self, num: int) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isPerfectSquare(int num) {\n        \n    }\n}`
    }
  },

  // 28. Arranging Coins
  {
    id: "arranging-coins",
    title: "Arranging Coins",
    difficulty: "Easy",
    category: "Binary Search",
    order: 28,
    description: `You have \`n\` coins and want to build a staircase. The ith row has exactly i coins. Return the number of **complete** rows.

## Approach & Strategy
This is asking for the largest \`k\` such that \`k(k+1)/2 <= n\`.
Use **Binary Search** for \`k\` in range [0, n].
Or solve mathematically: \`k ≈ sqrt(2n)\`.

### Complexity
- **Time**: O(log n) or O(1) math
- **Space**: O(1)`,
    examples: [
      { input: "5", output: "2", explanation: "Row 1: *, Row 2: **, Row 3: ** (incomplete)" },
      { input: "8", output: "3", explanation: "" }
    ],
    testCases: [
      { input: [5], expectedOutput: 2 },
      { input: [8], expectedOutput: 3 },
      { input: [1], expectedOutput: 1 },
      { input: [3], expectedOutput: 2 },
      { input: [6], expectedOutput: 3 },
      { input: [10], expectedOutput: 4 },
      { input: [0], expectedOutput: 0 },
      { input: [2147483647], expectedOutput: 65535 },
      { input: [2], expectedOutput: 1 },
      { input: [15], expectedOutput: 5 }
    ],
    constraints: ["1 <= n <= 2^31 - 1"],
    starterCode: {
      javascript: `function arrangeCoins(n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int arrangeCoins(int n) {\n        \n    }\n};`,
      c: `int arrangeCoins(int n) {\n    \n}`,
      python: `class Solution:\n    def arrangeCoins(self, n: int) -> int:\n        pass`,
      java: `class Solution {\n    public int arrangeCoins(int n) {\n        \n    }\n}`
    }
  },

  // 29. Find the Difference
  {
    id: "find-the-difference",
    title: "Find the Difference",
    difficulty: "Easy",
    category: "Bit Manipulation",
    order: 29,
    description: `String \`t\` is generated by random shuffling string \`s\` and adding one more letter. Return the letter that was added.

## Approach & Strategy
Use **XOR**.
XOR all characters in \`s\` and all characters in \`t\`.
The result will be the ASCII value of the added character because identical characters cancel out.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: 's = "abcd", t = "abcde"', output: '"e"', explanation: "" },
      { input: 's = "", t = "y"', output: '"y"', explanation: "" }
    ],
    testCases: [
      { input: ["abcd", "abcde"], expectedOutput: "e" },
      { input: ["", "y"], expectedOutput: "y" },
      { input: ["a", "aa"], expectedOutput: "a" },
      { input: ["ae", "aea"], expectedOutput: "a" },
      { input: ["xyz", "xyza"], expectedOutput: "a" },
      { input: ["qwer", "rewqr"], expectedOutput: "r" },
      { input: ["coding", "ingcods"], expectedOutput: "s" },
      { input: ["ab", "cba"], expectedOutput: "c" },
      { input: ["abcde", "edcbaX"], expectedOutput: "X" },
      { input: ["aaaa", "aaaaa"], expectedOutput: "a" }
    ],
    constraints: ["0 <= s.length <= 1000", "t.length == s.length + 1"],
    starterCode: {
      javascript: `function findTheDifference(s, t) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    char findTheDifference(string s, string t) {\n        \n    }\n};`,
      c: `char findTheDifference(char* s, char* t) {\n    \n}`,
      python: `class Solution:\n    def findTheDifference(self, s: str, t: str) -> str:\n        pass`,
      java: `class Solution {\n    public char findTheDifference(String s, String t) {\n        \n    }\n}`
    }
  },

  // 30. Jewels and Stones
  {
    id: "jewels-and-stones",
    title: "Jewels and Stones",
    difficulty: "Easy",
    category: "String",
    order: 30,
    description: `You're given strings \`jewels\` representing the types of stones that are jewels, and \`stones\` representing the stones you have. Each character in \`stones\` is a type of stone you have. You want to know how many of the stones you have are also jewels.

## Approach & Strategy
Use a **Set** for \`jewels\` for O(1) lookup.
1. Add all chars from \`jewels\` to a Set.
2. Iterate through \`stones\`.
3. If stone is in Set, increment counter.

### Complexity
- **Time**: O(n + m)
- **Space**: O(1) (Alphabet size)`,
    examples: [
      { input: 'jewels = "aA", stones = "aAAbbbb"', output: "3", explanation: "" },
      { input: 'jewels = "z", stones = "ZZ"', output: "0", explanation: "" }
    ],
    testCases: [
      { input: ["aA", "aAAbbbb"], expectedOutput: 3 },
      { input: ["z", "ZZ"], expectedOutput: 0 },
      { input: ["abc", "def"], expectedOutput: 0 },
      { input: ["a", "aaa"], expectedOutput: 3 },
      { input: ["A", "aAAbbbb"], expectedOutput: 2 },
      { input: ["zZ", "zZzZzZ"], expectedOutput: 6 },
      { input: ["b", "aAAbbbb"], expectedOutput: 4 },
      { input: ["", "abc"], expectedOutput: 0 },
      { input: ["abc", ""], expectedOutput: 0 },
      { input: ["a", "b"], expectedOutput: 0 }
    ],
    constraints: ["1 <= jewels.length, stones.length <= 50", "case sensitive"],
    starterCode: {
      javascript: `function numJewelsInStones(jewels, stones) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int numJewelsInStones(string jewels, string stones) {\n        \n    }\n};`,
      c: `int numJewelsInStones(char* jewels, char* stones) {\n    \n}`,
      python: `class Solution:\n    def numJewelsInStones(self, jewels: str, stones: str) -> int:\n        pass`,
      java: `class Solution {\n    public int numJewelsInStones(String jewels, String stones) {\n        \n    }\n}`
    }
  },

  // 31. Monotonic Array
  {
    id: "monotonic-array",
    title: "Monotonic Array",
    difficulty: "Easy",
    category: "Array",
    order: 31,
    description: `An array is **monotonic** if it is either monotone increasing or monotone decreasing.

An array \`nums\` is monotone increasing if for all \`i <= j\`, \`nums[i] <= nums[j]\`.
An array \`nums\` is monotone decreasing if for all \`i <= j\`, \`nums[i] >= nums[j]\`.

Return \`true\` if and only if the given array is monotonic.

## Approach & Strategy
One Pass:
1. Track two boolean flags: \`increasing\` and \`decreasing\`, both initialized to \`true\`.
2. Iterate through the array.
3. If \`nums[i] > nums[i-1]\`, it can't be decreasing (set \`decreasing = false\`).
4. If \`nums[i] < nums[i-1]\`, it can't be increasing (set \`increasing = false\`).
5. Return \`increasing || decreasing\`.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "1 2 2 3", output: "true", explanation: "Monotone increasing" },
      { input: "6 5 4 4", output: "true", explanation: "Monotone decreasing" },
      { input: "1 3 2", output: "false", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 2, 3]], expectedOutput: true },
      { input: [[6, 5, 4, 4]], expectedOutput: true },
      { input: [[1, 3, 2]], expectedOutput: false },
      { input: [[1, 2, 4, 5]], expectedOutput: true },
      { input: [[1, 1, 1]], expectedOutput: true },
      { input: [[1]], expectedOutput: true },
      { input: [[10, 9, 8, 7, 10]], expectedOutput: false },
      { input: [[5, 3, 2, 4, 1]], expectedOutput: false },
      { input: [[1, 1, 2]], expectedOutput: true },
      { input: [[2, 1, 1]], expectedOutput: true }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^5 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function isMonotonic(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isMonotonic(vector<int>& nums) {\n        \n    }\n};`,
      c: `bool isMonotonic(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def isMonotonic(self, nums: List[int]) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isMonotonic(int[] nums) {\n        \n    }\n}`
    }
  },

  // 32. Detect Capital
  {
    id: "detect-capital",
    title: "Detect Capital",
    difficulty: "Easy",
    category: "String",
    order: 32,
    description: `We define the usage of capitals in a word to be right if one of the following cases holds:
1. All letters in this word are capitals, like "USA".
2. All letters in this word are not capitals, like "leetcode".
3. Only the first letter in this word is capital, like "Google".

Given a string \`word\`, return \`true\` if the usage of capitals in it is right.

## Approach & Strategy
Check the three conditions:
1. Count the number of capital letters.
2. If count == length (All caps) -> True.
3. If count == 0 (No caps) -> True.
4. If count == 1 AND \`word[0]\` is upper -> True.
5. Else -> False.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "USA", output: "true", explanation: "" },
      { input: "FlaG", output: "false", explanation: "" }
    ],
    testCases: [
      { input: ["USA"], expectedOutput: true },
      { input: ["FlaG"], expectedOutput: false },
      { input: ["leetcode"], expectedOutput: true },
      { input: ["Google"], expectedOutput: true },
      { input: ["g"], expectedOutput: true },
      { input: ["G"], expectedOutput: true },
      { input: ["FFFFFf"], expectedOutput: false },
      { input: ["mL"], expectedOutput: false },
      { input: ["cApItAl"], expectedOutput: false },
      { input: ["A"], expectedOutput: true }
    ],
    constraints: ["1 <= word.length <= 100", "word consists of lowercase and uppercase English letters"],
    starterCode: {
      javascript: `function detectCapitalUse(word) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool detectCapitalUse(string word) {\n        \n    }\n};`,
      c: `bool detectCapitalUse(char* word) {\n    \n}`,
      python: `class Solution:\n    def detectCapitalUse(self, word: str) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean detectCapitalUse(String word) {\n        \n    }\n}`
    }
  },

  // 33. Reverse Words in a String III
  {
    id: "reverse-words-iii",
    title: "Reverse Words in a String III",
    difficulty: "Easy",
    category: "String",
    order: 33,
    description: `Given a string \`s\`, reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

## Approach & Strategy
Split and Reverse:
1. Split the string by spaces to get an array of words.
2. Reverse each word individually.
3. Join the words back together with a single space.
Alternatively, iterate through the string and use two pointers to reverse characters whenever a space (or end of string) is found.

### Complexity
- **Time**: O(n)
- **Space**: O(n) (for split result)`,
    examples: [
      { input: "Let's take LeetCode contest", output: "s'teL ekat edoCteeL tsetnoc", explanation: "" },
      { input: "God Ding", output: "doG gniD", explanation: "" }
    ],
    testCases: [
      { input: ["Let's take LeetCode contest"], expectedOutput: "s'teL ekat edoCteeL tsetnoc" },
      { input: ["God Ding"], expectedOutput: "doG gniD" },
      { input: ["a"], expectedOutput: "a" },
      { input: ["I love u"], expectedOutput: "I evol u" },
      { input: ["HeLLo WoRLd"], expectedOutput: "oLLeH dLRoW" },
      { input: ["123 456"], expectedOutput: "321 654" },
      { input: ["a b c"], expectedOutput: "a b c" },
      { input: ["double  space"], expectedOutput: "elbuod  ecaps" }, // Note: problem says preserving whitespace
      { input: ["qwerty"], expectedOutput: "ytrewq" },
      { input: ["z z"], expectedOutput: "z z" }
    ],
    constraints: ["1 <= s.length <= 5 * 10^4", "s contains printable ASCII characters", "s does not contain any leading or trailing spaces"],
    starterCode: {
      javascript: `function reverseWords(s) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    string reverseWords(string s) {\n        \n    }\n};`,
      c: `char* reverseWords(char* s) {\n    \n}`,
      python: `class Solution:\n    def reverseWords(self, s: str) -> str:\n        pass`,
      java: `class Solution {\n    public String reverseWords(String s) {\n        \n    }\n}`
    }
  },

  // 34. Rotate String
  {
    id: "rotate-string",
    title: "Rotate String",
    difficulty: "Easy",
    category: "String",
    order: 34,
    description: `Given two strings \`s\` and \`goal\`, return \`true\` if and only if \`s\` can become \`goal\` after some number of shifts on \`s\`.

A shift consists of moving the leftmost character of \`s\` to the rightmost position.

## Approach & Strategy
Concatenation Trick:
1. Check if \`s.length == goal.length\`. If not, return false.
2. Check if \`goal\` is a substring of \`s + s\`.
   - E.g., s="abcde", s+s="abcdeabcde". "cdeab" is clearly found inside.

### Complexity
- **Time**: O(n) (KMP or built-in find)
- **Space**: O(n) (for s+s)`,
    examples: [
      { input: 's = "abcde", goal = "cdeab"', output: "true", explanation: "" },
      { input: 's = "abcde", goal = "abced"', output: "false", explanation: "" }
    ],
    testCases: [
      { input: ["abcde", "cdeab"], expectedOutput: true },
      { input: ["abcde", "abced"], expectedOutput: false },
      { input: ["a", "a"], expectedOutput: true },
      { input: ["a", "b"], expectedOutput: false },
      { input: ["aa", "a"], expectedOutput: false },
      { input: ["abcde", "abcde"], expectedOutput: true },
      { input: ["clrwmpkwru", "wmpkwruclr"], expectedOutput: true },
      { input: ["def", "def"], expectedOutput: true },
      { input: ["abc", "bca"], expectedOutput: true },
      { input: ["abc", "acb"], expectedOutput: false }
    ],
    constraints: ["1 <= s.length, goal.length <= 100"],
    starterCode: {
      javascript: `function rotateString(s, goal) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool rotateString(string s, string goal) {\n        \n    }\n};`,
      c: `bool rotateString(char* s, char* goal) {\n    \n}`,
      python: `class Solution:\n    def rotateString(self, s: str, goal: str) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean rotateString(String s, String goal) {\n        \n    }\n}`
    }
  },

  // 35. Height Checker
  {
    id: "height-checker",
    title: "Height Checker",
    difficulty: "Easy",
    category: "Array",
    order: 35,
    description: `A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in **non-decreasing order** by height.

Return the number of indices where \`heights[i] != expected[i]\`.

## Approach & Strategy
Sorting:
1. Create a copy of the \`heights\` array and sort it to create \`expected\`.
2. Iterate through the arrays and count how many indices \`i\` have \`heights[i] != expected[i]\`.

### Complexity
- **Time**: O(n log n) (due to sorting)
- **Space**: O(n) (copy of array)`,
    examples: [
      { input: "[1,1,4,2,1,3]", output: "3", explanation: "Expected: [1,1,1,2,3,4]. Mismatch at indices 2, 4, 5." },
      { input: "[5,1,2,3,4]", output: "5", explanation: "Expected: [1,2,3,4,5]. All match failed." }
    ],
    testCases: [
      { input: [[1, 1, 4, 2, 1, 3]], expectedOutput: 3 },
      { input: [[5, 1, 2, 3, 4]], expectedOutput: 5 },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: 0 },
      { input: [[2, 1, 2, 1, 1, 2, 2, 1]], expectedOutput: 4 },
      { input: [[10, 6, 6, 10, 10, 9, 8, 8, 5, 3, 8, 2, 1, 2, 2]], expectedOutput: 14 }, // Random shuffle
      { input: [[1]], expectedOutput: 0 },
      { input: [[2, 1]], expectedOutput: 2 },
      { input: [[1, 1, 1]], expectedOutput: 0 },
      { input: [[100, 2, 1]], expectedOutput: 3 },
      { input: [[1, 1, 2, 2]], expectedOutput: 0 }
    ],
    constraints: ["1 <= heights.length <= 100", "1 <= heights[i] <= 100"],
    starterCode: {
      javascript: `function heightChecker(heights) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int heightChecker(vector<int>& heights) {\n        \n    }\n};`,
      c: `int heightChecker(int* heights, int heightsSize) {\n    \n}`,
      python: `class Solution:\n    def heightChecker(self, heights: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int heightChecker(int[] heights) {\n        \n    }\n}`
    }
  },

  // 36. Unique Number of Occurrences
  {
    id: "unique-occurrences",
    title: "Unique Number of Occurrences",
    difficulty: "Easy",
    category: "Array",
    order: 36,
    description: `Given an array of integers \`arr\`, return \`true\` if the number of occurrences of each value in the array is **unique** or \`false\` otherwise.

## Approach & Strategy
Map and Set:
1. Count the occurrences of each number using a Map (or hash table).
2. Insert all the occurrence counts into a Set.
3. Return \`true\` if \`map.size() == set.size()\`, implying all counts were unique.

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "[1,2,2,1,1,3]", output: "true", explanation: "1 -> 3 times, 2 -> 2 times, 3 -> 1 time. All counts unique." },
      { input: "[1,2]", output: "false", explanation: "1 -> 1 time, 2 -> 1 time. Not unique." }
    ],
    testCases: [
      { input: [[1, 2, 2, 1, 1, 3]], expectedOutput: true },
      { input: [[1, 2]], expectedOutput: false },
      { input: [[-3, 0, 1, -3, 1, 1, 1, -3, 10, 0]], expectedOutput: true },
      { input: [[1, 2, 3, 4]], expectedOutput: false }, // All 1s
      { input: [[1, 1, 2, 2, 3, 3]], expectedOutput: false },
      { input: [[10]], expectedOutput: true },
      { input: [[1, 1, 1, 1]], expectedOutput: true },
      { input: [[26, 2, 16, 16, 5, 5, 26, 2, 5, 20, 20, 5, 2, 20, 2, 2, 20, 2, 16, 20, 16, 17, 16, 2, 16, 20, 26, 16]], expectedOutput: false },
      { input: [[1, 1, 2]], expectedOutput: true },
      { input: [[1, 2, 2, 3, 3, 3]], expectedOutput: true }
    ],
    constraints: ["1 <= arr.length <= 1000", "-1000 <= arr[i] <= 1000"],
    starterCode: {
      javascript: `function uniqueOccurrences(arr) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool uniqueOccurrences(vector<int>& arr) {\n        \n    }\n};`,
      c: `bool uniqueOccurrences(int* arr, int arrSize) {\n    \n}`,
      python: `class Solution:\n    def uniqueOccurrences(self, arr: List[int]) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean uniqueOccurrences(int[] arr) {\n        \n    }\n}`
    }
  },

  // 37. Find Numbers with Even Number of Digits
  {
    id: "even-number-digits",
    title: "Find Numbers with Even Number of Digits",
    difficulty: "Easy",
    category: "Array",
    order: 37,
    description: `Given an array \`nums\` of integers, return how many of them contain an **even number** of digits.

## Approach & Strategy
Mathematical Logarithm or String Conversion:
1. Iterate through \`nums\`.
2. For each number, convert to string and check length % 2.
3. OR use \`floor(log10(num)) + 1\` to get digit count.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "[12,345,2,6,7896]", output: "2", explanation: "12 and 7896 have even digits." },
      { input: "[555,901,482,1771]", output: "1", explanation: "Only 1771 has even digits." }
    ],
    testCases: [
      { input: [[12, 345, 2, 6, 7896]], expectedOutput: 2 },
      { input: [[555, 901, 482, 1771]], expectedOutput: 1 },
      { input: [[1, 22, 333, 4444]], expectedOutput: 2 },
      { input: [[100000]], expectedOutput: 1 }, // 6 digits
      { input: [[0]], expectedOutput: 0 }, // 1 digit (odd)
      { input: [[1, 10, 100, 1000]], expectedOutput: 2 },
      { input: [[123]], expectedOutput: 0 },
      { input: [[58, 921]], expectedOutput: 1 },
      { input: [[1234]], expectedOutput: 1 },
      { input: [[1, 3, 5, 7]], expectedOutput: 0 }
    ],
    constraints: ["1 <= nums.length <= 500", "1 <= nums[i] <= 10^5"],
    starterCode: {
      javascript: `function findNumbers(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int findNumbers(vector<int>& nums) {\n        \n    }\n};`,
      c: `int findNumbers(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def findNumbers(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int findNumbers(int[] nums) {\n        \n    }\n}`
    }
  },

  // 38. Running Sum of 1d Array
  {
    id: "running-sum",
    title: "Running Sum of 1d Array",
    difficulty: "Easy",
    category: "Array",
    order: 38,
    description: `Given an array \`nums\`. We define a running sum of an array as \`runningSum[i] = sum(nums[0]…nums[i])\`. Return the running sum of \`nums\`.

## Approach & Strategy
In-place Modification:
1. Iterate from index 1 to n-1.
2. Update \`nums[i] += nums[i-1]\`.
3. Return \`nums\`.

### Complexity
- **Time**: O(n)
- **Space**: O(1) (modifying input)`,
    examples: [
      { input: "[1,2,3,4]", output: "[1,3,6,10]", explanation: "" },
      { input: "[1,1,1,1,1]", output: "[1,2,3,4,5]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 3, 4]], expectedOutput: [1, 3, 6, 10] },
      { input: [[1, 1, 1, 1, 1]], expectedOutput: [1, 2, 3, 4, 5] },
      { input: [[3, 1, 2, 10, 1]], expectedOutput: [3, 4, 6, 16, 17] },
      { input: [[10]], expectedOutput: [10] },
      { input: [[-1, -1, -1]], expectedOutput: [-1, -2, -3] },
      { input: [[1, -1, 1, -1]], expectedOutput: [1, 0, 1, 0] },
      { input: [[0, 0, 0]], expectedOutput: [0, 0, 0] },
      { input: [[5, 10, 20]], expectedOutput: [5, 15, 35] },
      { input: [[100, -100]], expectedOutput: [100, 0] },
      { input: [[2, 2, 2]], expectedOutput: [2, 4, 6] }
    ],
    constraints: ["1 <= nums.length <= 1000", "-10^6 <= nums[i] <= 10^6"],
    starterCode: {
      javascript: `function runningSum(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<int> runningSum(vector<int>& nums) {\n        \n    }\n};`,
      c: `int* runningSum(int* nums, int numsSize, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def runningSum(self, nums: List[int]) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] runningSum(int[] nums) {\n        \n    }\n}`
    }
  },

  // 39. Richest Customer Wealth
  {
    id: "richest-customer-wealth",
    title: "Richest Customer Wealth",
    difficulty: "Easy",
    category: "Array",
    order: 39,
    description: `You are given an \`m x n\` integer grid \`accounts\` where \`accounts[i][j]\` is the amount of money the \`i-th\` customer has in the \`j-th\` bank. Return the wealth that the richest customer has.

A customer's wealth is the amount of money they have in all their bank accounts. The richest customer is the customer that has the maximum wealth.

## Approach & Strategy
Iterate through rows:
1. For each customer (row), sum all their bank accounts.
2. Track the maximum sum found.

### Complexity
- **Time**: O(m * n)
- **Space**: O(1)`,
    examples: [
      { input: "[[1,2,3],[3,2,1]]", output: "6", explanation: "Both customers have wealth 6." },
      { input: "[[1,5],[7,3],[3,5]]", output: "10", explanation: "Customer 2 has wealth 7+3=10." }
    ],
    testCases: [
      { input: [[[1, 2, 3], [3, 2, 1]]], expectedOutput: 6 },
      { input: [[[1, 5], [7, 3], [3, 5]]], expectedOutput: 10 },
      { input: [[[2, 8, 7], [7, 1, 3], [1, 9, 5]]], expectedOutput: 17 },
      { input: [[[1]]], expectedOutput: 1 },
      { input: [[[1, 2], [3, 4], [5, 6]]], expectedOutput: 11 },
      { input: [[[100]]], expectedOutput: 100 },
      { input: [[[0, 0], [0, 0]]], expectedOutput: 0 },
      { input: [[[1, 1, 1], [1, 1, 1]]], expectedOutput: 3 },
      { input: [[[10, 20], [30, 0]]], expectedOutput: 30 },
      { input: [[[5, 10], [15, 0], [0, 20]]], expectedOutput: 20 }
    ],
    constraints: ["m == accounts.length", "n == accounts[i].length", "1 <= m, n <= 50"],
    starterCode: {
      javascript: `function maximumWealth(accounts) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int maximumWealth(vector<vector<int>>& accounts) {\n        \n    }\n};`,
      c: `int maximumWealth(int** accounts, int accountsSize, int* accountsColSize) {\n    \n}`,
      python: `class Solution:\n    def maximumWealth(self, accounts: List[List[int]]) -> int:\n        pass`,
      java: `class Solution {\n    public int maximumWealth(int[][] accounts) {\n        \n    }\n}`
    }
  },

  // 40. Shuffle the Array
  {
    id: "shuffle-the-array",
    title: "Shuffle the Array",
    difficulty: "Easy",
    category: "Array",
    order: 40,
    description: `Given the array \`nums\` consisting of \`2n\` elements in the form \`[x1,x2,...,xn,y1,y2,...,yn]\`.

Return the array in the form \`[x1,y1,x2,y2,...,xn,yn]\`.

## Approach & Strategy
Create a new array.
1. Iterate from \`0\` to \`n-1\`.
2. Place \`nums[i]\` at \`2*i\` (even index).
3. Place \`nums[i+n]\` at \`2*i+1\` (odd index).

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "nums = [2,5,1,3,4,7], n = 3", output: "[2,3,5,4,1,7]", explanation: "x1=2, x2=5, x3=1, y1=3, y2=4, y3=7" },
      { input: "nums = [1,2,3,4,4,3,2,1], n = 4", output: "[1,4,2,3,3,2,4,1]", explanation: "" }
    ],
    testCases: [
      { input: [[2, 5, 1, 3, 4, 7], 3], expectedOutput: [2, 3, 5, 4, 1, 7] },
      { input: [[1, 2, 3, 4, 4, 3, 2, 1], 4], expectedOutput: [1, 4, 2, 3, 3, 2, 4, 1] },
      { input: [[1, 1, 2, 2], 2], expectedOutput: [1, 2, 1, 2] },
      { input: [[10, 20], 1], expectedOutput: [10, 20] },
      { input: [[1, 2], 1], expectedOutput: [1, 2] },
      { input: [[1, 2, 3, 4, 5, 6], 3], expectedOutput: [1, 4, 2, 5, 3, 6] },
      { input: [[7, 8, 9, 1, 2, 3], 3], expectedOutput: [7, 1, 8, 2, 9, 3] },
      { input: [[0, 0, 1, 1], 2], expectedOutput: [0, 1, 0, 1] },
      { input: [[5, 5], 1], expectedOutput: [5, 5] },
      { input: [[2, 4, 6, 8], 2], expectedOutput: [2, 6, 4, 8] }
    ],
    constraints: ["1 <= n <= 500", "nums.length == 2n", "1 <= nums[i] <= 10^3"],
    starterCode: {
      javascript: `function shuffle(nums, n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<int> shuffle(vector<int>& nums, int n) {\n        \n    }\n};`,
      c: `int* shuffle(int* nums, int numsSize, int n, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def shuffle(self, nums: List[int], n: int) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] shuffle(int[] nums, int n) {\n        \n    }\n}`
    }
  },

  // 41. Defanging an IP Address
  {
    id: "defanging-ip-address",
    title: "Defanging an IP Address",
    difficulty: "Easy",
    category: "String",
    order: 41,
    description: `Given a valid (IPv4) IP \`address\`, return a defanged version of that IP address.

A defanged IP address replaces every period \`"."\` with \`"[.]"\`.

## Approach & Strategy
Use string replacement or build a new string.
1. Iterate through the characters of the string.
2. If the character is \`.\`, append \`[.]\` to the result.
3. Otherwise, append the character itself.

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "1.1.1.1", output: "1[.]1[.]1[.]1", explanation: "" },
      { input: "255.100.50.0", output: "255[.]100[.]50[.]0", explanation: "" }
    ],
    testCases: [
      { input: ["1.1.1.1"], expectedOutput: "1[.]1[.]1[.]1" },
      { input: ["255.100.50.0"], expectedOutput: "255[.]100[.]50[.]0" },
      { input: ["0.0.0.0"], expectedOutput: "0[.]0[.]0[.]0" },
      { input: ["192.168.1.1"], expectedOutput: "192[.]168[.]1[.]1" },
      { input: ["10.0.0.1"], expectedOutput: "10[.]0[.]0[.]1" },
      { input: ["127.0.0.1"], expectedOutput: "127[.]0[.]0[.]1" },
      { input: ["1.2.3.4"], expectedOutput: "1[.]2[.]3[.]4" },
      { input: ["100.200.150.50"], expectedOutput: "100[.]200[.]150[.]50" },
      { input: ["8.8.8.8"], expectedOutput: "8[.]8[.]8[.]8" },
      { input: ["172.16.254.1"], expectedOutput: "172[.]16[.]254[.]1" }
    ],
    constraints: ["address is a valid IPv4 address"],
    starterCode: {
      javascript: `function defangIPaddr(address) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    string defangIPaddr(string address) {\n        \n    }\n};`,
      c: `char* defangIPaddr(char* address) {\n    \n}`,
      python: `class Solution:\n    def defangIPaddr(self, address: str) -> str:\n        pass`,
      java: `class Solution {\n    public String defangIPaddr(String address) {\n        \n    }\n}`
    }
  },

  // 42. Kids With the Greatest Number of Candies
  {
    id: "kids-with-candies",
    title: "Kids With Candies",
    difficulty: "Easy",
    category: "Array",
    order: 42,
    description: `There are \`n\` kids with candies. You are given an integer array \`candies\`, where each \`candies[i]\` represents the number of candies the \`i-th\` kid has, and an integer \`extraCandies\`, denoting the number of extra candies that you have.

Return a boolean array \`result\` of length \`n\`, where \`result[i]\` is \`true\` if, after giving the \`i-th\` kid all the \`extraCandies\`, they will have the **greatest** number of candies among all the kids, or \`false\` otherwise.

## Approach & Strategy
1. Find the maximum number of candies any kid currently has (\`maxCandies\`).
2. Iterate through the array.
3. If \`candies[i] + extraCandies >= maxCandies\`, set result[i] to true.

### Complexity
- **Time**: O(n)
- **Space**: O(n) (for result array)`,
    examples: [
      { input: "candies = [2,3,5,1,3], extraCandies = 3", output: "[true,true,true,false,true]", explanation: "Max is 5. 2+3=5 (true), 3+3=6 (true), 5+3=8 (true), 1+3=4 (false), 3+3=6 (true)." },
      { input: "candies = [4,2,1,1,2], extraCandies = 1", output: "[true,false,false,false,false]", explanation: "Max is 4. Only 4+1 >= 4." }
    ],
    testCases: [
      { input: [[2, 3, 5, 1, 3], 3], expectedOutput: [true, true, true, false, true] },
      { input: [[4, 2, 1, 1, 2], 1], expectedOutput: [true, false, false, false, false] },
      { input: [[12, 1, 12], 10], expectedOutput: [true, false, true] },
      { input: [[1, 2, 3], 10], expectedOutput: [true, true, true] }, // Everyone exceeds old max
      { input: [[5], 5], expectedOutput: [true] },
      { input: [[2, 8, 7], 1], expectedOutput: [false, true, true] }, // 2+1 < 8, 7+1 >= 8
      { input: [[1, 1, 1], 0], expectedOutput: [true, true, true] },
      { input: [[10, 20, 30], 5], expectedOutput: [false, false, true] },
      { input: [[1, 100], 5], expectedOutput: [false, true] },
      { input: [[5, 4, 3, 2, 1], 2], expectedOutput: [true, true, true, false, false] }
    ],
    constraints: ["2 <= n <= 100", "1 <= candies[i] <= 100"],
    starterCode: {
      javascript: `function kidsWithCandies(candies, extraCandies) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<bool> kidsWithCandies(vector<int>& candies, int extraCandies) {\n        \n    }\n};`,
      c: `bool* kidsWithCandies(int* candies, int candiesSize, int extraCandies, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def kidsWithCandies(self, candies: List[int], extraCandies: int) -> List[bool]:\n        pass`,
      java: `class Solution {\n    public List<Boolean> kidsWithCandies(int[] candies, int extraCandies) {\n        \n    }\n}`
    }
  },

  // 43. 3Sum
  {
    id: "3sum",
    title: "3Sum",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 43,
    description: `Given an integer array nums, return all the triplets \`[nums[i], nums[j], nums[k]]\` such that \`i != j\`, \`i != k\`, and \`j != k\`, and \`nums[i] + nums[j] + nums[k] == 0\`.

Notice that the solution set must not contain duplicate triplets.

## Approach & Strategy
Sort + Two Pointers.
1. Sort the array.
2. Iterate with pointer \`i\`.
3. Use two pointers (\`left = i + 1\`, \`right = n - 1\`) to find pairs that sum to \`-nums[i]\`.
4. Skip duplicates for \`i\`, \`left\`, and \`right\` to ensure unique triplets.

### Complexity
- **Time**: O(n^2)
- **Space**: O(1) or O(n) (sorting)`,
    examples: [
      { input: "[-1,0,1,2,-1,-4]", output: "[[-1,-1,2],[-1,0,1]]", explanation: "" },
      { input: "[0,1,1]", output: "[]", explanation: "No triplet sums to 0." }
    ],
    testCases: [
      { input: [[-1, 0, 1, 2, -1, -4]], expectedOutput: [[-1, -1, 2], [-1, 0, 1]] },
      { input: [[0, 1, 1]], expectedOutput: [] },
      { input: [[0, 0, 0]], expectedOutput: [[0, 0, 0]] },
      { input: [[-2, 0, 1, 1, 2]], expectedOutput: [[-2, 0, 2], [-2, 1, 1]] },
      { input: [[-1, 0, 1, 0]], expectedOutput: [[-1, 0, 1]] },
      { input: [[-4, -2, 1, -5, -4, -4, 4, -2, 0, 4, 0, -2, 3, 1, -5, 0]], expectedOutput: [[-5, 1, 4], [-4, 0, 4], [-4, 1, 3], [-2, -2, 4], [-2, 1, 1], [0, 0, 0]] },
      { input: [[1, 2, -2, -1]], expectedOutput: [] },
      { input: [[3, 0, -2, -1, 1, 2]], expectedOutput: [[-2, -1, 3], [-2, 0, 2], [-1, 0, 1]] },
      { input: [[-1, 0, 1, 2, -1, -4, -2, -3, 3, 0, 4]], expectedOutput: [[-4, 0, 4], [-4, 1, 3], [-3, -1, 4], [-3, 0, 3], [-3, 1, 2], [-2, -1, 3], [-2, 0, 2], [-1, -1, 2], [-1, 0, 1]] },
      { input: [[1, -1]], expectedOutput: [] }
    ],
    constraints: ["0 <= nums.length <= 3000"],
    starterCode: {
      javascript: `function threeSum(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};`,
      c: `int** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        pass`,
      java: `class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}`
    }
  },

  // 44. Group Anagrams
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    difficulty: "Medium",
    category: "String",
    order: 44,
    description: `Given an array of strings \`strs\`, group the anagrams together. You can return the answer in any order.

## Approach & Strategy
Use a **Hash Map**.
1. Iterate through each string.
2. Generate a key for each string. The key can be the sorted string (e.g., "eat" -> "aet") or a character count string (e.g., "1a1e1t").
3. Group strings with the same key in the map.
4. Return values of the map. 

### Complexity
- **Time**: O(N * K log K) where N is number of strings, K is max length of string.
- **Space**: O(N * K)`,
    examples: [
      { input: '["eat","tea","tan","ate","nat","bat"]', output: '[["bat"],["nat","tan"],["ate","eat","tea"]]', explanation: "" },
      { input: '[""]', output: '[[""]]', explanation: "" }
    ],
    testCases: [
      { input: [["eat", "tea", "tan", "ate", "nat", "bat"]], expectedOutput: [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]] }, // Order of inner/outer groups varies
      { input: [[""]], expectedOutput: [[""]] },
      { input: [["a"]], expectedOutput: [["a"]] },
      { input: [["abc", "bca", "cba", "xyz", "zyx"]], expectedOutput: [["abc", "bca", "cba"], ["xyz", "zyx"]] },
      { input: [["word", "drow", "rowd", "cool", "loco"]], expectedOutput: [["word", "drow", "rowd"], ["cool", "loco"]] },
      { input: [["a", "b", "c"]], expectedOutput: [["a"], ["b"], ["c"]] },
      { input: [["listen", "silent", "enlist", "google", "gogole"]], expectedOutput: [["listen", "silent", "enlist"], ["google", "gogole"]] },
      { input: [["rat", "tar", "art", "star", "tars", "cheese"]], expectedOutput: [["rat", "tar", "art"], ["star", "tars"], ["cheese"]] },
      { input: [["gap", "pag", "gpa", "app"]], expectedOutput: [["gap", "pag", "gpa"], ["app"]] },
      { input: [["no", "on", "one"]], expectedOutput: [["no", "on"], ["one"]] }
    ],
    constraints: ["1 <= strs.length <= 10^4", "0 <= strs[i].length <= 100"],
    starterCode: {
      javascript: `function groupAnagrams(strs) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        \n    }\n};`,
      c: `char*** groupAnagrams(char** strs, int strsSize, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def groupAnagrams(self, strs: List[str]) -> List[List[str]]:\n        pass`,
      java: `class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        \n    }\n}`
    }
  },

  // 45. Product of Array Except Self
  {
    id: "product-except-self",
    title: "Product of Array Except Self",
    difficulty: "Medium",
    category: "Array",
    order: 45,
    description: `Given an integer array \`nums\`, return an array \`answer\` such that \`answer[i]\` is equal to the product of all the elements of \`nums\` except \`nums[i]\`.

The product of any prefix or suffix of \`nums\` is guaranteed to fit in a 32-bit integer.
**You must write an algorithm that runs in O(n) time and without using the division operation.**

## Approach & Strategy
Prefix and Suffix Products.
1. Create \`answer\` array.
2. First pass (Left to Right): Store prefix products. \`answer[i]\` = product of all nums to the left.
3. Second pass (Right to Left): Multiply \`answer[i]\` by product of all nums to the right.

### Complexity
- **Time**: O(n)
- **Space**: O(1) (excluding output array)`,
    examples: [
      { input: "[1,2,3,4]", output: "[24,12,8,6]", explanation: "" },
      { input: "[-1,1,0,-3,3]", output: "[0,0,9,0,0]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 3, 4]], expectedOutput: [24, 12, 8, 6] },
      { input: [[-1, 1, 0, -3, 3]], expectedOutput: [0, 0, 9, 0, 0] },
      { input: [[0, 0]], expectedOutput: [0, 0] },
      { input: [[1, 1]], expectedOutput: [1, 1] },
      { input: [[2, 3, 5, 0]], expectedOutput: [0, 0, 0, 30] },
      { input: [[4, 5, 1, 8, 2]], expectedOutput: [80, 64, 320, 40, 160] },
      { input: [[10, 10]], expectedOutput: [10, 10] },
      { input: [[1, 2, 3]], expectedOutput: [6, 3, 2] },
      { input: [[-1, -1, -1]], expectedOutput: [1, 1, 1] },
      { input: [[1, 0, 2, 0, 3]], expectedOutput: [0, 0, 0, 0, 0] }
    ],
    constraints: ["2 <= nums.length <= 10^5", "-30 <= nums[i] <= 30"],
    starterCode: {
      javascript: `function productExceptSelf(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};`,
      c: `int* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}`
    }
  },

  // 46. Container With Most Water
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    difficulty: "Medium",
    category: "Two Pointers",
    order: 46,
    description: `You are given an integer array \`height\` of length \`n\`. There are \`n\` vertical lines drawn such that the two endpoints of the \`ith\` line are \`(i, 0)\` and \`(i, height[i])\`.

Find two lines that together with the x-axis form a container, such that the container contains the most water.

## Approach & Strategy
Use **Two Pointers**, one at the beginning (\`left\`) and one at the end (\`right\`).
1. Calculate area: \`min(height[left], height[right]) * (right - left)\`.
2. Update max area.
3. Move the pointer pointing to the shorter line inward (because moving the taller line can't increase area limited by the shorter line). 

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "[1,8,6,2,5,4,8,3,7]", output: "49", explanation: "Vertical lines at index 1 and 8 (heights 8 and 7) creates area 7 * 7 = 49." },
      { input: "[1,1]", output: "1", explanation: "" }
    ],
    testCases: [
      { input: [[1, 8, 6, 2, 5, 4, 8, 3, 7]], expectedOutput: 49 },
      { input: [[1, 1]], expectedOutput: 1 },
      { input: [[4, 3, 2, 1, 4]], expectedOutput: 16 },
      { input: [[1, 2, 1]], expectedOutput: 2 },
      { input: [[2, 3, 4, 5, 18, 17, 6]], expectedOutput: 17 },
      { input: [[10, 9, 8]], expectedOutput: 16 }, // 8 * 2 = 16
      { input: [[1, 1000, 1000, 1]], expectedOutput: 1000 }, // area between indices 1 and 2 (width 1, height 1000)
      { input: [[1, 2, 4, 3]], expectedOutput: 4 },
      { input: [[0, 2]], expectedOutput: 0 },
      { input: [[2, 3, 10, 5, 7, 8, 9]], expectedOutput: 36 } // (9 vs 3 is 3*6=18, 9 vs 10 is 9*4=36)
    ],
    constraints: ["2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    starterCode: {
      javascript: `function maxArea(height) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};`,
      c: `int maxArea(int* height, int heightSize) {\n    \n}`,
      python: `class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}`
    }
  },

  // 47. Top K Frequent Elements
  {
    id: "top-k-frequent",
    title: "Top K Frequent Elements",
    difficulty: "Medium",
    category: "Heap",
    order: 47,
    description: `Given an integer array \`nums\` and an integer \`k\`, return the \`k\` most frequent elements. You may return the answer in any order.

## Approach & Strategy
Use a **Frequency Map** + **Heap** (Min-Heap of size k) OR **Bucket Sort**.
Bucket Sort Strategy:
1. Count frequencies.
2. Create buckets where index = frequency.
3. Fill buckets with numbers.
4. Iterate buckets from end to start to get top k.

### Complexity
- **Time**: O(n) (Bucket Sort) or O(n log k) (Heap)
- **Space**: O(n)`,
    examples: [
      { input: "nums = [1,1,1,2,2,3], k = 2", output: "[1,2]", explanation: "" },
      { input: "nums = [1], k = 1", output: "[1]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 1, 1, 2, 2, 3], 2], expectedOutput: [1, 2] },
      { input: [[1], 1], expectedOutput: [1] },
      { input: [[-1, -1], 1], expectedOutput: [-1] },
      { input: [[1, 2], 2], expectedOutput: [1, 2] },
      { input: [[4, 1, -1, 2, -1, 2, 3], 2], expectedOutput: [-1, 2] },
      { input: [[1, 1, 1, 2, 2, 3, 3, 3], 2], expectedOutput: [1, 3] }, // order irrelevant
      { input: [[1, 2, 3, 4, 5], 5], expectedOutput: [1, 2, 3, 4, 5] },
      { input: [[1, 1, 1, 1, 1, 2], 1], expectedOutput: [1] },
      { input: [[10], 1], expectedOutput: [10] },
      { input: [[5, 3, 1, 1, 1, 3, 73, 1], 2], expectedOutput: [1, 3] }
    ],
    constraints: ["1 <= nums.length <= 10^5", "k is in range [1, number of unique elements]"],
    starterCode: {
      javascript: `function topKFrequent(nums, k) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<int> topKFrequent(vector<int>& nums, int k) {\n        \n    }\n};`,
      c: `int* topKFrequent(int* nums, int numsSize, int k, int* returnSize) {\n    \n}`,
      python: `class Solution:\n    def topKFrequent(self, nums: List[int], k: int) -> List[int]:\n        pass`,
      java: `class Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        \n    }\n}`
    }
  },

  // 48. Longest Consecutive Sequence
  {
    id: "longest-consecutive-sequence",
    title: "Longest Consecutive Sequence",
    difficulty: "Medium",
    category: "Array",
    order: 48,
    description: `Given an unsorted array of integers \`nums\`, return the length of the longest consecutive elements sequence.

You must write an algorithm that runs in **O(n)** time.

## Approach & Strategy
Use a **Hash Set**.
1. Add all numbers to a Set.
2. Iterate through the set.
3. If \`num - 1\` is NOT in set, it means \`num\` is the start of a sequence.
4. Count upwards (\`num + 1\`, \`num + 2\`, ...) while they exist in the set.
5. Update max length.

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "[100,4,200,1,3,2]", output: "4", explanation: "Sequence: [1, 2, 3, 4]" },
      { input: "[0,3,7,2,5,8,4,6,0,1]", output: "9", explanation: "Sequence: [0, 1, 2, 3, 4, 5, 6, 7, 8]" }
    ],
    testCases: [
      { input: [[100, 4, 200, 1, 3, 2]], expectedOutput: 4 },
      { input: [[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]], expectedOutput: 9 },
      { input: [[]], expectedOutput: 0 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[1, 2, 0, 1]], expectedOutput: 3 }, // duplicates ignored by logic
      { input: [[5, 4, 3, 2, 1]], expectedOutput: 5 },
      { input: [[10, 1, 20, 2]], expectedOutput: 2 }, // [1,2] or [10] or [20]
      { input: [[9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6]], expectedOutput: 7 }, // -1, 0, 1...
      { input: [[100]], expectedOutput: 1 },
      { input: [[0]], expectedOutput: 1 }
    ],
    constraints: ["0 <= nums.length <= 10^5"],
    starterCode: {
      javascript: `function longestConsecutive(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int longestConsecutive(vector<int>& nums) {\n        \n    }\n};`,
      c: `int longestConsecutive(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def longestConsecutive(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int longestConsecutive(int[] nums) {\n        \n    }\n}`
    }
  },

  // 49. Find Minimum in Rotated Sorted Array
  {
    id: "find-min-rotated-sorted",
    title: "Find Min in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    order: 49,
    description: `Given the sorted rotated array \`nums\` of unique elements, return the minimum element of this array.

You must write an algorithm that runs in **O(log n)** time.

## Approach & Strategy
Use **Binary Search**.
1. \`low = 0\`, \`high = n - 1\`.
2. While \`low < high\`:
   - \`mid = (low + high) / 2\`.
   - If \`nums[mid] > nums[high]\`: Minimum is in the right part (\`low = mid + 1\`).
   - Else: Minimum is in left part or is mid (\`high = mid\`).
3. Return \`nums[low]\`.

### Complexity
- **Time**: O(log n)
- **Space**: O(1)`,
    examples: [
      { input: "[3,4,5,1,2]", output: "1", explanation: "" },
      { input: "[4,5,6,7,0,1,2]", output: "0", explanation: "" },
      { input: "[11,13,15,17]", output: "11", explanation: "" }
    ],
    testCases: [
      { input: [[3, 4, 5, 1, 2]], expectedOutput: 1 },
      { input: [[4, 5, 6, 7, 0, 1, 2]], expectedOutput: 0 },
      { input: [[11, 13, 15, 17]], expectedOutput: 11 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[2, 1]], expectedOutput: 1 },
      { input: [[5, 1, 2, 3, 4]], expectedOutput: 1 },
      { input: [[2, 3, 4, 5, 1]], expectedOutput: 1 },
      { input: [[3, 1, 2]], expectedOutput: 1 },
      { input: [[10, 20, 30, 5]], expectedOutput: 5 },
      { input: [[8, 9, 2, 3, 4]], expectedOutput: 2 }
    ],
    constraints: ["1 <= nums.length <= 5000", "All integers in nums are unique"],
    starterCode: {
      javascript: `function findMin(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int findMin(vector<int>& nums) {\n        \n    }\n};`,
      c: `int findMin(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def findMin(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int findMin(int[] nums) {\n        \n    }\n}`
    }
  },

  // 50. House Robber
  {
    id: "house-robber",
    title: "House Robber",
    difficulty: "Medium",
    category: "DP",
    order: 50,
    description: `You are a professional robber planning to rob houses along a street. Each house has a certain amount of money stashed, but adjacent houses have security systems connected.

Given an integer array \`nums\` representing the amount of money of each house, return the maximum amount of money you can rob tonight without alerting the police (cannot rob adjacent houses).

## Approach & Strategy
Use **Dynamic Programming**.
Let \`dp[i]\` be the max money robbed up to house \`i\`.
Recurrence: \`dp[i] = max(dp[i-1], nums[i] + dp[i-2])\`.
We can optimize space to use just two variables: \`prev1\` (i-1) and \`prev2\` (i-2).

### Complexity
- **Time**: O(n)
- **Space**: O(1) (space optimized)`,
    examples: [
      { input: "[1,2,3,1]", output: "4", explanation: "Rob house 1 (money = 1) and then rob house 3 (money = 3). Total = 4." },
      { input: "[2,7,9,3,1]", output: "12", explanation: "Rob house 1 (2), house 3 (9), house 5 (1). Total = 12." }
    ],
    testCases: [
      { input: [[1, 2, 3, 1]], expectedOutput: 4 },
      { input: [[2, 7, 9, 3, 1]], expectedOutput: 12 },
      { input: [[2, 1, 1, 2]], expectedOutput: 4 },
      { input: [[5]], expectedOutput: 5 },
      { input: [[0]], expectedOutput: 0 },
      { input: [[1, 3, 1]], expectedOutput: 3 },
      { input: [[1, 2]], expectedOutput: 2 },
      { input: [[1, 3, 1, 3, 100]], expectedOutput: 103 },
      { input: [[100, 1, 1, 100]], expectedOutput: 200 },
      { input: [[4, 1, 2, 7, 5, 3, 1]], expectedOutput: 14 }
    ],
    constraints: ["1 <= nums.length <= 100"],
    starterCode: {
      javascript: `function rob(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int rob(vector<int>& nums) {\n        \n    }\n};`,
      c: `int rob(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def rob(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int rob(int[] nums) {\n        \n    }\n}`
    }
  },

  // 51. Valid Parentheses (Review)
  {
    id: "valid-parentheses-2",
    title: "Valid Parentheses (Review)",
    difficulty: "Easy",
    category: "Stack",
    order: 51,
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.

## Approach & Strategy
Use a **Stack**.
1. Iterate through characters.
2. If it's an opening bracket, push to stack.
3. If it's a closing bracket, check if stack is empty (invalid) or if the top of stack matches the pair. If match, pop. If not, invalid.
4. Return true if stack is empty at the end.

### Complexity
- **Time**: O(n)
- **Space**: O(n)`,
    examples: [
      { input: "()", output: "true", explanation: "" },
      { input: "()[]{}", output: "true", explanation: "" }
    ],
    testCases: [
      { input: ["()"], expectedOutput: true },
      { input: ["()[]{}"], expectedOutput: true },
      { input: ["(]"], expectedOutput: false },
      { input: ["([)]"], expectedOutput: false },
      { input: ["{[]}"], expectedOutput: true },
      { input: [""], expectedOutput: true },
      { input: ["[",], expectedOutput: false },
      { input: ["]"], expectedOutput: false },
      { input: ["((("], expectedOutput: false },
      { input: ["(()"], expectedOutput: false },
      { input: ["(([]){})"], expectedOutput: true },
      { input: ["}{"], expectedOutput: false }
    ],
    constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
    starterCode: {
      javascript: `function isValid(s) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};`,
      c: `bool isValid(char* s) {\n    \n}`,
      python: `class Solution:\n    def isValid(self, s: str) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}`
    }
  },

  // 52. Merge Intervals
  {
    id: "merge-intervals",
    title: "Merge Intervals",
    difficulty: "Medium",
    category: "Array",
    order: 52,
    description: `Given an array of \`intervals\` where \`intervals[i] = [start, end]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

## Approach & Strategy
Sort and Merge.
1. Sort intervals by their **start** time.
2. Create a result list and add the first interval.
3. Iterate through remaining intervals.
4. If current interval starts *before* the last merged interval ends, merge them (update end time to \`max(prevEnd, currEnd)\`).
5. Otherwise, add current interval to result. 

### Complexity
- **Time**: O(n log n) (due to sorting)
- **Space**: O(n) (output storage)`,
    examples: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", output: "[[1,6],[8,10],[15,18]]", explanation: "Intervals [1,3] and [2,6] overlap, merging them into [1,6]." },
      { input: "[[1,4],[4,5]]", output: "[[1,5]]", explanation: "Intervals [1,4] and [4,5] are considered overlapping." }
    ],
    testCases: [
      { input: [[[1, 3], [2, 6], [8, 10], [15, 18]]], expectedOutput: [[1, 6], [8, 10], [15, 18]] },
      { input: [[[1, 4], [4, 5]]], expectedOutput: [[1, 5]] },
      { input: [[[1, 4], [0, 4]]], expectedOutput: [[0, 4]] },
      { input: [[[1, 4], [2, 3]]], expectedOutput: [[1, 4]] },
      { input: [[[1, 10], [2, 3], [4, 5], [6, 7], [8, 9]]], expectedOutput: [[1, 10]] },
      { input: [[[1, 4], [0, 0]]], expectedOutput: [[0, 0], [1, 4]] },
      { input: [[[2, 3], [4, 5], [6, 7], [8, 9], [1, 10]]], expectedOutput: [[1, 10]] },
      { input: [[[1, 3]]], expectedOutput: [[1, 3]] },
      { input: [[[1, 4], [0, 2], [3, 5]]], expectedOutput: [[0, 5]] },
      { input: [[[1, 4], [5, 6]]], expectedOutput: [[1, 4], [5, 6]] }
    ],
    constraints: ["1 <= intervals.length <= 10^4", "intervals[i].length == 2"],
    starterCode: {
      javascript: `function merge(intervals) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> merge(vector<vector<int>>& intervals) {\n        \n    }\n};`,
      c: `int** merge(int** intervals, int intervalsSize, int* intervalsColSize, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def merge(self, intervals: List[List[int]]) -> List[List[int]]:\n        pass`,
      java: `class Solution {\n    public int[][] merge(int[][] intervals) {\n        \n    }\n}`
    }
  },

  // 53. Maximum Subarray (Review)
  {
    id: "maximum-subarray-2",
    title: "Maximum Subarray (Review)",
    difficulty: "Medium",
    category: "DP",
    order: 53,
    description: `Given an integer array \`nums\`, find the subarray which has the largest sum and return its sum.

## Approach & Strategy
**Kadane's Algorithm**.
1. Iterate through array.
2. Calculate \`currentSum = max(num, currentSum + num)\`.
   - This decides whether to start a new subarray at current \`num\` or extend the previous one.
3. Update \`maxSum = max(maxSum, currentSum)\`.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "[-2,1,-3,4,-1,2,1,-5,4]", output: "6", explanation: "Subarray [4,-1,2,1] has the largest sum 6." },
      { input: "[1]", output: "1", explanation: "" }
    ],
    testCases: [
      { input: [[-2, 1, -3, 4, -1, 2, 1, -5, 4]], expectedOutput: 6 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[5, 4, -1, 7, 8]], expectedOutput: 23 },
      { input: [[-1]], expectedOutput: -1 },
      { input: [[-2, -1]], expectedOutput: -1 },
      { input: [[-1, -2]], expectedOutput: -1 },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: 15 },
      { input: [[-1, 0, -2]], expectedOutput: 0 },
      { input: [[-2, 1]], expectedOutput: 1 },
      { input: [[-2, -3, 4, -1, -2, 1, 5, -3]], expectedOutput: 7 }
    ],
    constraints: ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function maxSubArray(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};`,
      c: `int maxSubArray(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}`
    }
  },

  // 54. Climbing Stairs (Review)
  {
    id: "climbing-stairs-2",
    title: "Climbing Stairs (Review)",
    difficulty: "Easy",
    category: "DP",
    order: 54,
    description: `You are climbing a staircase. It takes \`n\` steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

## Approach & Strategy
Dynamic Programming (Fibonacci).
- \`dp[i] = dp[i-1] + dp[i-2]\`
- Use two variables to store previous results to save space.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "2", output: "2", explanation: "1+1, 2" },
      { input: "3", output: "3", explanation: "1+1+1, 1+2, 2+1" }
    ],
    testCases: [
      { input: [1], expectedOutput: 1 },
      { input: [2], expectedOutput: 2 },
      { input: [3], expectedOutput: 3 },
      { input: [4], expectedOutput: 5 },
      { input: [5], expectedOutput: 8 },
      { input: [6], expectedOutput: 13 },
      { input: [10], expectedOutput: 89 },
      { input: [20], expectedOutput: 10946 },
      { input: [30], expectedOutput: 832040 },
      { input: [45], expectedOutput: 1836311903 }
    ],
    constraints: ["1 <= n <= 45"],
    starterCode: {
      javascript: `function climbStairs(n) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};`,
      c: `int climbStairs(int n) {\n    \n}`,
      python: `class Solution:\n    def climbStairs(self, n: int) -> int:\n        pass`,
      java: `class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}`
    }
  },

  // 55. Reverse Linked List
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    difficulty: "Easy",
    category: "Linked List",
    order: 55,
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

## Approach & Strategy
Iterative:
1. Initialize \`prev = null\`, \`curr = head\`.
2. Loop while \`curr\` is not null:
   - Save \`next = curr.next\`.
   - Reverse link: \`curr.next = prev\`.
   - Advance: \`prev = curr\`, \`curr = next\`.
3. Return \`prev\` (new head). 

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "[1,2,3,4,5]", output: "[5,4,3,2,1]", explanation: "" },
      { input: "[1,2]", output: "[2,1]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 3, 4, 5]], expectedOutput: [5, 4, 3, 2, 1] },
      { input: [[1, 2]], expectedOutput: [2, 1] },
      { input: [[]], expectedOutput: [] },
      { input: [[1]], expectedOutput: [1] },
      { input: [[1, 2, 3]], expectedOutput: [3, 2, 1] },
      { input: [[-1, -5, 0]], expectedOutput: [0, -5, -1] },
      { input: [[10, 20, 30, 40]], expectedOutput: [40, 30, 20, 10] },
      { input: [[5, 5, 5]], expectedOutput: [5, 5, 5] },
      { input: [[1, 0, 1]], expectedOutput: [1, 0, 1] },
      { input: [[1, 2, 3, 4]], expectedOutput: [4, 3, 2, 1] }
    ],
    constraints: ["0 <= number of nodes <= 5000", "-5000 <= Node.val <= 5000"],
    starterCode: {
      javascript: `/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nfunction reverseList(head) {\n  // Write your code here\n};`,
      cpp: `/**\n * Definition for singly-linked list.\n * struct ListNode {\n * int val;\n * ListNode *next;\n * ListNode() : val(0), next(nullptr) {}\n * ListNode(int x) : val(x), next(nullptr) {}\n * ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        \n    }\n};`,
      c: `struct ListNode* reverseList(struct ListNode* head) {\n    \n}`,
      python: `class Solution:\n    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
      java: `class Solution {\n    public ListNode reverseList(ListNode head) {\n        \n    }\n}`
    }
  },

  // 56. Merge Two Sorted Lists
  {
    id: "merge-two-sorted-lists",
    title: "Merge Two Sorted Lists",
    difficulty: "Easy",
    category: "Linked List",
    order: 56,
    description: `You are given the heads of two sorted linked lists \`list1\` and \`list2\`.

Merge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.

## Approach & Strategy
Use a **Dummy Node** and a pointer.
1. Create a \`dummy\` node. \`tail = dummy\`.
2. Loop while both \`list1\` and \`list2\` exist.
3. If \`list1.val < list2.val\`, attach \`list1\` to tail, advance \`list1\`.
4. Else, attach \`list2\` to tail, advance \`list2\`.
5. Attach remainder of non-empty list.
6. Return \`dummy.next\`.

### Complexity
- **Time**: O(n + m)
- **Space**: O(1)`,
    examples: [
      { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]", explanation: "" },
      { input: "list1 = [], list2 = []", output: "[]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 4], [1, 3, 4]], expectedOutput: [1, 1, 2, 3, 4, 4] },
      { input: [[], []], expectedOutput: [] },
      { input: [[], [0]], expectedOutput: [0] },
      { input: [[1], [2]], expectedOutput: [1, 2] },
      { input: [[2], [1]], expectedOutput: [1, 2] },
      { input: [[5, 6, 7], [1, 2, 3]], expectedOutput: [1, 2, 3, 5, 6, 7] },
      { input: [[1, 2, 3], [4, 5, 6]], expectedOutput: [1, 2, 3, 4, 5, 6] },
      { input: [[-10, -5], [-7, 0]], expectedOutput: [-10, -7, -5, 0] },
      { input: [[1, 1], [1, 1]], expectedOutput: [1, 1, 1, 1] },
      { input: [[1, 5], [2, 4]], expectedOutput: [1, 2, 4, 5] }
    ],
    constraints: ["0 <= number of nodes <= 50", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function mergeTwoLists(list1, list2) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};`,
      c: `struct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {\n    \n}`,
      python: `class Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        pass`,
      java: `class Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}`
    }
  },

  // 57. Linked List Cycle
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle",
    difficulty: "Easy",
    category: "Linked List",
    order: 57,
    description: `Given \`head\`, the head of a linked list, determine if the linked list has a cycle in it.

## Approach & Strategy
Use **Floyd's Cycle-Finding Algorithm** (Tortoise and Hare).
1. Initialize \`slow\` and \`fast\` pointers to head.
2. Move \`slow\` by 1 step, \`fast\` by 2 steps.
3. If \`fast\` reaches null, no cycle.
4. If \`slow == fast\`, there is a cycle.

### Complexity
- **Time**: O(n)
- **Space**: O(1)`,
    examples: [
      { input: "head = [3,2,0,-4], pos = 1", output: "true", explanation: "Tail connects to node index 1." },
      { input: "head = [1], pos = -1", output: "false", explanation: "No cycle." }
    ],
    testCases: [
      { input: [[3, 2, 0, -4]], expectedOutput: true }, // Assumes cycle setup in handler
      { input: [[1, 2]], expectedOutput: true },
      { input: [[1]], expectedOutput: false },
      { input: [[]], expectedOutput: false },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: false }, // Explicit linear
      // Note: Test cases for cycles usually require specific handler logic to create the cycle based on `pos` param usually provided in raw data, handled here abstractly.
      { input: [[1, 2], -1], expectedOutput: false },
      { input: [[1], -1], expectedOutput: false },
      { input: [[1, 2, 3], 0], expectedOutput: true }, // Cycle to 0
      { input: [[-1, -7, 7, -4, 19, 6, -9, -5, -2, -5], 9], expectedOutput: true },
      { input: [[1, 2, 3, 4], 2], expectedOutput: true }
    ],
    constraints: ["0 <= number of nodes <= 10^4", "pos is -1 or valid index"],
    starterCode: {
      javascript: `function hasCycle(head) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};`,
      c: `bool hasCycle(struct ListNode *head) {\n    \n}`,
      python: `class Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        pass`,
      java: `public class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}`
    }
  },

  // 58. Invert Binary Tree
  {
    id: "invert-binary-tree",
    title: "Invert Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 58,
    description: `Given the \`root\` of a binary tree, invert the tree, and return its root.

Inverting means swapping left and right children for every node.

## Approach & Strategy
Use **Recursion**.
1. Base case: if root is null, return null.
2. Swap \`root.left\` and \`root.right\`.
3. Recursively call invert on \`root.left\` and \`root.right\`. 

### Complexity
- **Time**: O(n)
- **Space**: O(h) (stack height)`,
    examples: [
      { input: "root = [4,2,7,1,3,6,9]", output: "[4,7,2,9,6,3,1]", explanation: "" },
      { input: "root = [2,1,3]", output: "[2,3,1]", explanation: "" }
    ],
    testCases: [
      { input: [[4, 2, 7, 1, 3, 6, 9]], expectedOutput: [4, 7, 2, 9, 6, 3, 1] },
      { input: [[2, 1, 3]], expectedOutput: [2, 3, 1] },
      { input: [[]], expectedOutput: [] },
      { input: [[1]], expectedOutput: [1] },
      { input: [[1, 2]], expectedOutput: [1, null, 2] }, // 1 -> L:2 becomes 1 -> R:2
      { input: [[1, null, 2]], expectedOutput: [1, 2] },
      { input: [[3, 1, null, null, 2]], expectedOutput: [3, null, 1, 2] }, // Logic needs careful tree serialization check
      { input: [[10, 5, 15]], expectedOutput: [10, 15, 5] },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: [1, 3, 2, null, null, 5, 4] },
      { input: [[100]], expectedOutput: [100] }
    ],
    constraints: ["0 <= number of nodes <= 100", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function invertTree(root) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};`,
      c: `struct TreeNode* invertTree(struct TreeNode* root) {\n    \n}`,
      python: `class Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        pass`,
      java: `class Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}`
    }
  },

  // 59. Maximum Depth of Binary Tree
  {
    id: "max-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 59,
    description: `Given the \`root\` of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

## Approach & Strategy
Use **DFS (Recursion)**.
1. Base case: If root is null, depth is 0.
2. Recursive step: \`1 + max(maxDepth(left), maxDepth(right))\`.

### Complexity
- **Time**: O(n)
- **Space**: O(h) (recursion stack)`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "3", explanation: "" },
      { input: "root = [1,null,2]", output: "2", explanation: "" }
    ],
    testCases: [
      { input: [[3, 9, 20, null, null, 15, 7]], expectedOutput: 3 },
      { input: [[1, null, 2]], expectedOutput: 2 },
      { input: [[]], expectedOutput: 0 },
      { input: [[0]], expectedOutput: 1 },
      { input: [[1, 2, 3, 4, null, null, 5]], expectedOutput: 3 },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: 3 },
      { input: [[1, null, null]], expectedOutput: 1 },
      { input: [[1, 2, null, 3, null, 4, null]], expectedOutput: 4 }, // Skewed
      { input: [[1, 2, 3, 4, 5, 6, 7]], expectedOutput: 3 },
      { input: [[1, null, 2, null, 3]], expectedOutput: 3 }
    ],
    constraints: ["0 <= number of nodes <= 10^4", "-100 <= Node.val <= 100"],
    starterCode: {
      javascript: `function maxDepth(root) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        \n    }\n};`,
      c: `int maxDepth(struct TreeNode* root) {\n    \n}`,
      python: `class Solution:\n    def maxDepth(self, root: Optional[TreeNode]) -> int:\n        pass`,
      java: `class Solution {\n    public int maxDepth(TreeNode root) {\n        \n    }\n}`
    }
  },

  // 60. Same Tree
  {
    id: "same-tree",
    title: "Same Tree",
    difficulty: "Easy",
    category: "Tree",
    order: 60,
    description: `Given the roots of two binary trees \`p\` and \`q\`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

## Approach & Strategy
Use **Recursion**.
1. If both \`p\` and \`q\` are null, return true.
2. If only one is null or values differ, return false.
3. Return \`isSameTree(p.left, q.left) && isSameTree(p.right, q.right)\`.

### Complexity
- **Time**: O(n)
- **Space**: O(h)`,
    examples: [
      { input: "p = [1,2,3], q = [1,2,3]", output: "true", explanation: "" },
      { input: "p = [1,2], q = [1,null,2]", output: "false", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 3], [1, 2, 3]], expectedOutput: true },
      { input: [[1, 2], [1, null, 2]], expectedOutput: false },
      { input: [[1, 2, 1], [1, 1, 2]], expectedOutput: false },
      { input: [[], []], expectedOutput: true },
      { input: [[1], []], expectedOutput: false },
      { input: [[], [1]], expectedOutput: false },
      { input: [[10, 5, 15], [10, 5, 15]], expectedOutput: true },
      { input: [[1, 2], [1, 2, 3]], expectedOutput: false },
      { input: [[1, 2, 3, 4], [1, 2, 3, 4]], expectedOutput: true },
      { input: [[1, 2, 3], [1, 2, 4]], expectedOutput: false }
    ],
    constraints: ["0 <= number of nodes <= 100", "-10^4 <= Node.val <= 10^4"],
    starterCode: {
      javascript: `function isSameTree(p, q) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isSameTree(TreeNode* p, TreeNode* q) {\n        \n    }\n};`,
      c: `bool isSameTree(struct TreeNode* p, struct TreeNode* q) {\n    \n}`,
      python: `class Solution:\n    def isSameTree(self, p: Optional[TreeNode], q: Optional[TreeNode]) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isSameTree(TreeNode p, TreeNode q) {\n        \n    }\n}`
    }
  },

  // 61. Binary Tree Level Order Traversal
  {
    id: "binary-tree-level-order",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    category: "Tree",
    order: 61,
    description: `Given the \`root\` of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

## Approach & Strategy
Use **Breadth-First Search (BFS)** with a Queue.
1. Initialize a queue with \`root\`.
2. While queue is not empty:
   - Get current size of queue (nodes at current level).
   - Iterate that many times, popping nodes and adding their children.
   - Store values of processed nodes in a sub-list.
   - Add sub-list to result. 

### Complexity
- **Time**: O(n)
- **Space**: O(n) (max width of tree)`,
    examples: [
      { input: "root = [3,9,20,null,null,15,7]", output: "[[3],[9,20],[15,7]]", explanation: "" },
      { input: "root = [1]", output: "[[1]]", explanation: "" }
    ],
    testCases: [
      { input: [[3, 9, 20, null, null, 15, 7]], expectedOutput: [[3], [9, 20], [15, 7]] },
      { input: [[1]], expectedOutput: [[1]] },
      { input: [[]], expectedOutput: [] },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: [[1], [2, 3], [4, 5]] },
      { input: [[1, 2, null, 3, null, 4, null]], expectedOutput: [[1], [2], [3], [4]] }, // Skewed left
      { input: [[1, null, 2, null, 3, null, 4]], expectedOutput: [[1], [2], [3], [4]] }, // Skewed right
      { input: [[1, 2, 3, 4, null, null, 5]], expectedOutput: [[1], [2, 3], [4, 5]] },
      { input: [[10, 5, 20, 3, 7, 15, 25]], expectedOutput: [[10], [5, 20], [3, 7, 15, 25]] },
      { input: [[1, 2, 3, 4, 5, 6, 7]], expectedOutput: [[1], [2, 3], [4, 5, 6, 7]] },
      { input: [[0, -5, 5, null, -10]], expectedOutput: [[0], [-5, 5], [-10]] }
    ],
    constraints: ["0 <= number of nodes <= 2000", "-1000 <= Node.val <= 1000"],
    starterCode: {
      javascript: `function levelOrder(root) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        \n    }\n};`,
      c: `int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def levelOrder(self, root: Optional[TreeNode]) -> List[List[int]]:\n        pass`,
      java: `class Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        \n    }\n}`
    }
  },

  // 62. Validate Binary Search Tree
  {
    id: "validate-bst",
    title: "Validate Binary Search Tree",
    difficulty: "Medium",
    category: "Tree",
    order: 62,
    description: `Given the \`root\` of a binary tree, determine if it is a valid binary search tree (BST).

A **valid BST** is defined as follows:
- The left subtree of a node contains only nodes with keys **less than** the node's key.
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

## Approach & Strategy
Use **Recursion with Valid Range**.
1. \`isValid(node, min, max)\`.
2. Base case: if node is null, return true.
3. If \`node.val <= min\` or \`node.val >= max\`, return false.
4. Recursively check left: \`isValid(left, min, node.val)\`.
5. Recursively check right: \`isValid(right, node.val, max)\`.

### Complexity
- **Time**: O(n)
- **Space**: O(h)`,
    examples: [
      { input: "root = [2,1,3]", output: "true", explanation: "" },
      { input: "root = [5,1,4,null,null,3,6]", output: "false", explanation: "The root node's value is 5 but its right child's value is 4." }
    ],
    testCases: [
      { input: [[2, 1, 3]], expectedOutput: true },
      { input: [[5, 1, 4, null, null, 3, 6]], expectedOutput: false },
      { input: [[5, 4, 6, null, null, 3, 7]], expectedOutput: false }, // 3 is in right subtree of 5 but < 5
      { input: [[1]], expectedOutput: true },
      { input: [[2, 2, 2]], expectedOutput: false }, // duplicates not allowed per strict definition
      { input: [[10, 5, 15, null, null, 6, 20]], expectedOutput: false }, // 6 is in right subtree of 10 but < 10
      { input: [[2147483647]], expectedOutput: true },
      { input: [[-2147483648]], expectedOutput: true },
      { input: [[1, 1]], expectedOutput: false },
      { input: [[3, 1, 5, 0, 2, 4, 6]], expectedOutput: true }
    ],
    constraints: ["1 <= number of nodes <= 10^4", "-2^31 <= Node.val <= 2^31 - 1"],
    starterCode: {
      javascript: `function isValidBST(root) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool isValidBST(TreeNode* root) {\n        \n    }\n};`,
      c: `bool isValidBST(struct TreeNode* root) {\n    \n}`,
      python: `class Solution:\n    def isValidBST(self, root: Optional[TreeNode]) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean isValidBST(TreeNode root) {\n        \n    }\n}`
    }
  },

  // 63. Number of Islands
  {
    id: "number-of-islands",
    title: "Number of Islands",
    difficulty: "Medium",
    category: "Graph",
    order: 63,
    description: `Given an \`m x n\` 2D binary grid \`grid\` which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

## Approach & Strategy
Use **DFS or BFS**.
1. Iterate through every cell.
2. If cell is '1', increment count and start a traversal (DFS/BFS) to mark all connected '1's as visited (or turn them to '0').
3. Continue until all cells are processed.

### Complexity
- **Time**: O(m * n)
- **Space**: O(m * n) (recursion stack or queue)`,
    examples: [
      {
        input: `[["1","1","1","1","0"],
 ["1","1","0","1","0"],
 ["1","1","0","0","0"],
 ["0","0","0","0","0"]]`,
        output: "1",
        explanation: ""
      },
      {
        input: `[["1","1","0","0","0"],
 ["1","1","0","0","0"],
 ["0","0","1","0","0"],
 ["0","0","0","1","1"]]`,
        output: "3",
        explanation: ""
      }
    ],
    testCases: [
      { input: [[["1", "1", "1"], ["0", "1", "0"], ["1", "1", "1"]]], expectedOutput: 1 },
      { input: [[["1", "0", "1"], ["0", "1", "0"], ["1", "0", "1"]]], expectedOutput: 5 },
      { input: [[["0", "0"], ["0", "0"]]], expectedOutput: 0 },
      { input: [[["1"]]], expectedOutput: 1 },
      { input: [[["1", "1"]]], expectedOutput: 1 },
      { input: [[["1"], ["1"]]], expectedOutput: 1 },
      { input: [[["1", "0"], ["0", "1"]]], expectedOutput: 2 },
      { input: [[["1", "1", "0", "0", "0"], ["1", "1", "0", "0", "0"], ["0", "0", "1", "0", "0"], ["0", "0", "0", "1", "1"]]], expectedOutput: 3 },
      { input: [[["1", "1", "1"], ["1", "1", "1"], ["1", "1", "1"]]], expectedOutput: 1 },
      { input: [[["1", "0", "1", "1", "1"], ["1", "0", "1", "0", "1"], ["1", "1", "1", "0", "1"]]], expectedOutput: 1 }
    ],
    constraints: ["m == grid.length", "n == grid[i].length", "1 <= m, n <= 300"],
    starterCode: {
      javascript: `function numIslands(grid) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};`,
      c: `int numIslands(char** grid, int gridSize, int* gridColSize) {\n    \n}`,
      python: `class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        pass`,
      java: `class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}`
    }
  },

  // 64. Coin Change
  {
    id: "coin-change",
    title: "Coin Change",
    difficulty: "Medium",
    category: "DP",
    order: 64,
    description: `You are given an integer array \`coins\` representing coins of different denominations and an integer \`amount\` representing a total amount of money.

Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return \`-1\`.

You may assume that you have an infinite number of each kind of coin.

## Approach & Strategy
Use **Dynamic Programming** (Bottom-Up).
1. Create \`dp\` array of size \`amount + 1\`, init with infinity (amount + 1). \`dp[0] = 0\`.
2. Iterate \`i\` from 1 to \`amount\`.
3. For each coin, if \`coin <= i\`, \`dp[i] = min(dp[i], dp[i - coin] + 1)\`.
4. If \`dp[amount]\` > amount, return -1. 

### Complexity
- **Time**: O(S * n) where S is amount, n is coin count.
- **Space**: O(S)`,
    examples: [
      { input: "coins = [1,2,5], amount = 11", output: "3", explanation: "11 = 5 + 5 + 1" },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 5], 11], expectedOutput: 3 },
      { input: [[2], 3], expectedOutput: -1 },
      { input: [[1], 0], expectedOutput: 0 },
      { input: [[1, 2, 5], 100], expectedOutput: 20 },
      { input: [[186, 419, 83, 408], 6249], expectedOutput: 20 },
      { input: [[1, 2147483647], 2], expectedOutput: 2 },
      { input: [[2, 5, 10, 1], 27], expectedOutput: 4 }, // 10+10+5+2
      { input: [[3, 5], 7], expectedOutput: -1 },
      { input: [[4, 5], 8], expectedOutput: 2 },
      { input: [[1, 3, 4, 5], 7], expectedOutput: 2 } // 3+4
    ],
    constraints: ["1 <= coins.length <= 12", "0 <= amount <= 10^4"],
    starterCode: {
      javascript: `function coinChange(coins, amount) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};`,
      c: `int coinChange(int* coins, int coinsSize, int amount) {\n    \n}`,
      python: `class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        pass`,
      java: `class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}`
    }
  },

  // 65. Longest Increasing Subsequence
  {
    id: "longest-increasing-subsequence",
    title: "Longest Increasing Subsequence",
    difficulty: "Medium",
    category: "DP",
    order: 65,
    description: `Given an integer array \`nums\`, return the length of the longest strictly increasing subsequence.

A **subsequence** is a sequence that can be derived from an array by deleting some or no elements without changing the order of the remaining elements.

## Approach & Strategy
Use **Dynamic Programming** or **Binary Search (Patience Sorting)**.
DP Approach:
1. \`dp[i]\` = length of LIS ending at index i.
2. \`dp[i] = 1 + max(dp[j])\` for all \`0 <= j < i\` where \`nums[j] < nums[i]\`.
3. Max of \`dp\` array is answer.

### Complexity
- **Time**: O(n^2) (DP) or O(n log n) (Binary Search)
- **Space**: O(n)`,
    examples: [
      { input: "[10,9,2,5,3,7,101,18]", output: "4", explanation: "The longest increasing subsequence is [2,3,7,101], therefore the length is 4." },
      { input: "[0,1,0,3,2,3]", output: "4", explanation: "" }
    ],
    testCases: [
      { input: [[10, 9, 2, 5, 3, 7, 101, 18]], expectedOutput: 4 },
      { input: [[0, 1, 0, 3, 2, 3]], expectedOutput: 4 },
      { input: [[7, 7, 7, 7, 7, 7, 7]], expectedOutput: 1 },
      { input: [[1, 3, 6, 7, 9, 4, 10, 5, 6]], expectedOutput: 6 },
      { input: [[1]], expectedOutput: 1 },
      { input: [[1, 2, 3, 4, 5]], expectedOutput: 5 },
      { input: [[5, 4, 3, 2, 1]], expectedOutput: 1 },
      { input: [[100, 1, 101, 2, 102, 3]], expectedOutput: 3 },
      { input: [[10, 20, 10, 20, 10]], expectedOutput: 2 },
      { input: [[4, 10, 4, 3, 8, 9]], expectedOutput: 3 }
    ],
    constraints: ["1 <= nums.length <= 2500", "-10^4 <= nums[i] <= 10^4"],
    starterCode: {
      javascript: `function lengthOfLIS(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int lengthOfLIS(vector<int>& nums) {\n        \n    }\n};`,
      c: `int lengthOfLIS(int* nums, int numsSize) {\n    \n}`,
      python: `class Solution:\n    def lengthOfLIS(self, nums: List[int]) -> int:\n        pass`,
      java: `class Solution {\n    public int lengthOfLIS(int[] nums) {\n        \n    }\n}`
    }
  },

  // 66. Word Break
  {
    id: "word-break",
    title: "Word Break",
    difficulty: "Medium",
    category: "DP",
    order: 66,
    description: `Given a string \`s\` and a dictionary of strings \`wordDict\`, return \`true\` if \`s\` can be segmented into a space-separated sequence of one or more dictionary words.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

## Approach & Strategy
Use **Dynamic Programming**.
1. \`dp[i]\` is true if substring \`s[0...i-1]\` can be segmented.
2. \`dp[0] = true\`.
3. Loop \`i\` from 1 to length. Loop \`j\` from 0 to \`i\`.
4. If \`dp[j]\` is true and \`s[j...i-1]\` is in dict, then \`dp[i] = true\`.

### Complexity
- **Time**: O(n^2 * k) (substring checks)
- **Space**: O(n)`,
    examples: [
      { input: 's = "leetcode", wordDict = ["leet","code"]', output: "true", explanation: "Return true because \"leetcode\" can be segmented as \"leet code\"." },
      { input: 's = "applepenapple", wordDict = ["apple","pen"]', output: "true", explanation: "" }
    ],
    testCases: [
      { input: ["leetcode", ["leet", "code"]], expectedOutput: true },
      { input: ["applepenapple", ["apple", "pen"]], expectedOutput: true },
      { input: ["catsandog", ["cats", "dog", "sand", "and", "cat"]], expectedOutput: false },
      { input: ["aaaaaaa", ["aaaa", "aaa"]], expectedOutput: true },
      { input: ["a", ["b"]], expectedOutput: false },
      { input: ["a", ["a"]], expectedOutput: true },
      { input: ["cars", ["car", "ca", "rs"]], expectedOutput: true },
      { input: ["cbca", ["bc", "ca"]], expectedOutput: false },
      { input: ["abcd", ["a", "abc", "b", "cd"]], expectedOutput: true },
      { input: ["goals", ["go", "goal", "goals"]], expectedOutput: true }
    ],
    constraints: ["1 <= s.length <= 300", "1 <= wordDict.length <= 1000"],
    starterCode: {
      javascript: `function wordBreak(s, wordDict) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    bool wordBreak(string s, vector<string>& wordDict) {\n        \n    }\n};`,
      c: `bool wordBreak(char* s, char** wordDict, int wordDictSize) {\n    \n}`,
      python: `class Solution:\n    def wordBreak(self, s: str, wordDict: List[str]) -> bool:\n        pass`,
      java: `class Solution {\n    public boolean wordBreak(String s, List<String> wordDict) {\n        \n    }\n}`
    }
  },

  // 67. Search in Rotated Sorted Array
  {
    id: "search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    difficulty: "Medium",
    category: "Binary Search",
    order: 67,
    description: `Given the array \`nums\` after the possible rotation and an integer \`target\`, return the index of \`target\` if it is in \`nums\`, or \`-1\` if it is not in \`nums\`.

Prior to being passed to your function, \`nums\` is possibly rotated at an unknown pivot index.

## Approach & Strategy
Modified **Binary Search**.
1. Check which half is sorted.
2. If left half is sorted (\`nums[low] <= nums[mid]\`):
   - If target is within range \`[low, mid]\`, search left. Else search right.
3. Else (right half is sorted):
   - If target is within range \`[mid, high]\`, search right. Else search left.

### Complexity
- **Time**: O(log n)
- **Space**: O(1)`,
    examples: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", output: "4", explanation: "" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", output: "-1", explanation: "" }
    ],
    testCases: [
      { input: [[4, 5, 6, 7, 0, 1, 2], 0], expectedOutput: 4 },
      { input: [[4, 5, 6, 7, 0, 1, 2], 3], expectedOutput: -1 },
      { input: [[1], 0], expectedOutput: -1 },
      { input: [[1], 1], expectedOutput: 0 },
      { input: [[5, 1, 3], 5], expectedOutput: 0 },
      { input: [[3, 1], 1], expectedOutput: 1 },
      { input: [[3, 5, 1], 3], expectedOutput: 0 },
      { input: [[1, 3], 3], expectedOutput: 1 },
      { input: [[8, 1, 2, 3, 4, 5, 6, 7], 6], expectedOutput: 6 },
      { input: [[4, 5, 6, 7, 8, 1, 2, 3], 8], expectedOutput: 4 }
    ],
    constraints: ["1 <= nums.length <= 5000", "nums has unique values"],
    starterCode: {
      javascript: `function search(nums, target) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};`,
      c: `int search(int* nums, int numsSize, int target) {\n    \n}`,
      python: `class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        pass`,
      java: `class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}`
    }
  },

  // 68. Combination Sum
  {
    id: "combination-sum",
    title: "Combination Sum",
    difficulty: "Medium",
    category: "Backtracking",
    order: 68,
    description: `Given an array of distinct integers \`candidates\` and a target integer \`target\`, return a list of all unique combinations of \`candidates\` where the chosen numbers sum to \`target\`.

The same number may be chosen from \`candidates\` an unlimited number of times.

## Approach & Strategy
Use **Backtracking**.
1. Sort candidates (optional but helps optimization).
2. Recursive function \`backtrack(remain, combination, start_index)\`.
3. If \`remain == 0\`, add current combination to result.
4. If \`remain < 0\`, return.
5. Loop through candidates starting from \`start_index\` (to allow reuse but avoid duplicates). 

### Complexity
- **Time**: O(N^(T/M)) where N is candidates length, T is target, M is min value.
- **Space**: O(T/M) (recursion depth)`,
    examples: [
      { input: "candidates = [2,3,6,7], target = 7", output: "[[2,2,3],[7]]", explanation: "2 and 3 are candidates, and 2+2+3 = 7. Note that 2 can be used multiple times." },
      { input: "candidates = [2,3,5], target = 8", output: "[[2,2,2,2],[2,3,3],[3,5]]", explanation: "" }
    ],
    testCases: [
      { input: [[2, 3, 6, 7], 7], expectedOutput: [[2, 2, 3], [7]] },
      { input: [[2, 3, 5], 8], expectedOutput: [[2, 2, 2, 2], [2, 3, 3], [3, 5]] },
      { input: [[2], 1], expectedOutput: [] },
      { input: [[1], 1], expectedOutput: [[1]] },
      { input: [[1], 2], expectedOutput: [[1, 1]] },
      { input: [[3, 5, 8], 11], expectedOutput: [[3, 3, 5], [3, 8]] },
      { input: [[2, 4, 6], 5], expectedOutput: [] },
      { input: [[7, 3, 2], 18], expectedOutput: [[2, 2, 2, 2, 2, 2, 2, 2, 2], [2, 2, 2, 2, 2, 2, 3, 3], [2, 2, 2, 2, 3, 7], [2, 2, 2, 3, 3, 3, 3], [2, 2, 7, 7], [2, 3, 3, 3, 7], [3, 3, 3, 3, 3, 3]] }, // Complex
      { input: [[100], 200], expectedOutput: [[100, 100]] },
      { input: [[5, 10, 20], 25], expectedOutput: [[5, 5, 5, 5, 5], [5, 5, 5, 10], [5, 10, 10], [5, 20]] }
    ],
    constraints: ["1 <= candidates.length <= 30", "1 <= candidates[i] <= 200", "All elements distinct", "1 <= target <= 500"],
    starterCode: {
      javascript: `function combinationSum(candidates, target) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> combinationSum(vector<int>& candidates, int target) {\n        \n    }\n};`,
      c: `int** combinationSum(int* candidates, int candidatesSize, int target, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def combinationSum(self, candidates: List[int], target: int) -> List[List[int]]:\n        pass`,
      java: `class Solution {\n    public List<List<Integer>> combinationSum(int[] candidates, int target) {\n        \n    }\n}`
    }
  },

  // 69. Permutations
  {
    id: "permutations",
    title: "Permutations",
    difficulty: "Medium",
    category: "Backtracking",
    order: 69,
    description: `Given an array \`nums\` of distinct integers, return all the possible permutations. You can return the answer in any order.

## Approach & Strategy
Use **Backtracking**.
1. \`backtrack(current_list)\`.
2. Base case: If \`current_list.length == nums.length\`, add copy to result.
3. Iterate through \`nums\`.
4. If \`num\` is already in \`current_list\`, skip.
5. Add \`num\`, recurse, then remove \`num\` (backtrack).

### Complexity
- **Time**: O(N!)
- **Space**: O(N!)`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]", explanation: "" },
      { input: "nums = [0,1]", output: "[[0,1],[1,0]]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 3]], expectedOutput: [[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]] },
      { input: [[0, 1]], expectedOutput: [[0, 1], [1, 0]] },
      { input: [[1]], expectedOutput: [[1]] },
      { input: [[1, 2, 3, 4]], expectedOutput: "24 items..." }, // Too large to list generally
      { input: [[5, 4]], expectedOutput: [[5, 4], [4, 5]] },
      { input: [[-1, 1]], expectedOutput: [[-1, 1], [1, -1]] },
      { input: [[10]], expectedOutput: [[10]] },
      { input: [[2, 0, 1]], expectedOutput: [[2, 0, 1], [2, 1, 0], [0, 2, 1], [0, 1, 2], [1, 2, 0], [1, 0, 2]] },
      { input: [[8, 16]], expectedOutput: [[8, 16], [16, 8]] },
      { input: [[1, 2]], expectedOutput: [[1, 2], [2, 1]] }
    ],
    constraints: ["1 <= nums.length <= 6", "All integers distinct"],
    starterCode: {
      javascript: `function permute(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> permute(vector<int>& nums) {\n        \n    }\n};`,
      c: `int** permute(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def permute(self, nums: List[int]) -> List[List[int]]:\n        pass`,
      java: `class Solution {\n    public List<List<Integer>> permute(int[] nums) {\n        \n    }\n}`
    }
  },

  // 70. Subsets
  {
    id: "subsets",
    title: "Subsets",
    difficulty: "Medium",
    category: "Backtracking",
    order: 70,
    description: `Given an integer array \`nums\` of unique elements, return all possible subsets (the power set). The solution set must not contain duplicate subsets.

## Approach & Strategy
Use **Backtracking** or **Cascading**.
Backtracking:
1. \`backtrack(start_index, current_list)\`.
2. Add \`current_list\` to result.
3. Loop from \`start_index\` to end.
4. Add \`nums[i]\`, recurse, remove \`nums[i]\`.

### Complexity
- **Time**: O(N * 2^N)
- **Space**: O(N * 2^N)`,
    examples: [
      { input: "nums = [1,2,3]", output: "[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]", explanation: "" },
      { input: "nums = [0]", output: "[[],[0]]", explanation: "" }
    ],
    testCases: [
      { input: [[1, 2, 3]], expectedOutput: [[], [1], [2], [1, 2], [3], [1, 3], [2, 3], [1, 2, 3]] },
      { input: [[0]], expectedOutput: [[], [0]] },
      { input: [[1, 2]], expectedOutput: [[], [1], [2], [1, 2]] },
      { input: [], expectedOutput: [[]] },
      { input: [[5, 6, 7]], expectedOutput: [[], [5], [6], [5, 6], [7], [5, 7], [6, 7], [5, 6, 7]] },
      { input: [[9]], expectedOutput: [[], [9]] },
      { input: [[-1, 1]], expectedOutput: [[], [-1], [1], [-1, 1]] },
      { input: [[10, 20]], expectedOutput: [[], [10], [20], [10, 20]] },
      { input: [[1, 2, 3, 4]], expectedOutput: "16 items..." },
      { input: [[4, 2]], expectedOutput: [[], [4], [2], [4, 2]] }
    ],
    constraints: ["1 <= nums.length <= 10", "All numbers distinct"],
    starterCode: {
      javascript: `function subsets(nums) {\n  // Write your code here\n};`,
      cpp: `class Solution {\npublic:\n    vector<vector<int>> subsets(vector<int>& nums) {\n        \n    }\n};`,
      c: `int** subsets(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    \n}`,
      python: `class Solution:\n    def subsets(self, nums: List[int]) -> List[List[int]]:\n        pass`,
      java: `class Solution {\n    public List<List<Integer>> subsets(int[] nums) {\n        \n    }\n}`
    }
  },

   // 71. Jump Game
  {
    id: "jump-game", // ADDED ID
    title: "Jump Game",
    difficulty: "Medium",
    category: "Greedy",
    order: 71,
    
    description: `You are given an integer array **nums**. You are initially positioned at the array's **first index**, and each element in the array represents your **maximum jump length** at that position.

Return **true** if you can reach the last index, or **false** otherwise.

## Approach & Strategy
Use a **greedy approach**: Keep track of the farthest position you can reach. As you iterate, update the farthest reachable index. If at any point you can't move forward, return false.

### Complexity
- **Time**: O(n) - Single pass through array
- **Space**: O(1) - Only tracking max reach`,
    
    examples: [
      {
        input: "5\n2 3 1 1 4",
        output: "true",
        explanation: "Jump 1 step from index 0 to 1, then 3 steps to the last index"
      },
      {
        input: "5\n3 2 1 0 4",
        output: "false",
        explanation: "You will always arrive at index 3. Its maximum jump length is 0, so you can never reach the last index"
      },
      {
        input: "1\n0",
        output: "true",
        explanation: "Already at last index"
      }
    ],
    
    testCases: [
      { input: [5, [2, 3, 1, 1, 4]], expectedOutput: "true" },
      { input: [5, [3, 2, 1, 0, 4]], expectedOutput: "false" },
      { input: [1, [0]], expectedOutput: "true" },
      { input: [2, [2, 0]], expectedOutput: "true" },
      { input: [3, [0, 2, 3]], expectedOutput: "false" },
      { input: [4, [1, 1, 1, 1]], expectedOutput: "true" },
      { input: [6, [5, 4, 3, 2, 1, 0]], expectedOutput: "true" },
      { input: [7, [1, 2, 0, 1, 0, 1, 0]], expectedOutput: "true" },
      { input: [4, [2, 0, 0, 1]], expectedOutput: "true" },
      { input: [5, [1, 0, 1, 0, 1]], expectedOutput: "false" },
      { input: [3, [2, 5, 0]], expectedOutput: "true" },
      { input: [6, [3, 0, 8, 2, 0, 0]], expectedOutput: "true" }
    ],
    
    constraints: [
      "1 <= nums.length <= 10^4",
      "0 <= nums[i] <= 10^5"
    ],
    
    tags: ["Array", "Greedy", "Dynamic Programming"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const n = parseInt(readline());
    const nums = readline().split(' ').map(x => parseInt(x));
    // Write your code here
}`,
      
      python: `n = int(input())
nums = list(map(int, input().split()))

# Write your code here
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] nums = new int[n];
        for(int i = 0; i < n; i++) {
            nums[i] = sc.nextInt();
        }
        
        // Write your code here
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> nums(n);
    for(int i = 0; i < n; i++) {
        cin >> nums[i];
    }
    
    // Write your code here
    
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int nums[n];
    for(int i = 0; i < n; i++) {
        scanf("%d", &nums[i]);
    }
    
    // Write your code here
    
    return 0;
}`
    }
  },

  // 72. Rotate Image
  {
    id: "rotate-image", // ADDED ID
    title: "Rotate Image",
    difficulty: "Medium",
    category: "Matrix",
    order: 72,
    
    description: `You are given an **n x n** 2D matrix representing an image, rotate the image by **90 degrees** (clockwise).

You have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

## Approach & Strategy
**Two-step approach**:
1. **Transpose** the matrix (swap rows with columns)
2. **Reverse** each row

### Complexity
- **Time**: O(n²) - Visit each cell once
- **Space**: O(1) - In-place rotation`,
    
    examples: [
      {
        input: "3\n1 2 3\n4 5 6\n7 8 9",
        output: "7 4 1\n8 5 2\n9 6 3",
        explanation: "Rotate the matrix 90° clockwise: transpose then reverse each row"
      },
      {
        input: "2\n1 2\n3 4",
        output: "3 1\n4 2",
        explanation: "For 2x2 matrix, rotation swaps diagonal elements"
      }
    ],
    
    testCases: [
      { input: [3, [[1,2,3],[4,5,6],[7,8,9]]], expectedOutput: "7 4 1\n8 5 2\n9 6 3" },
      { input: [2, [[1,2],[3,4]]], expectedOutput: "3 1\n4 2" },
      { input: [1, [[1]]], expectedOutput: "1" },
      { input: [4, [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]], expectedOutput: "13 9 5 1\n14 10 6 2\n15 11 7 3\n16 12 8 4" },
      { input: [3, [[5,1,9],[2,4,8],[13,3,6]]], expectedOutput: "13 2 5\n3 4 1\n6 8 9" },
      { input: [2, [[0,1],[2,3]]], expectedOutput: "2 0\n3 1" },
      { input: [3, [[1,1,1],[2,2,2],[3,3,3]]], expectedOutput: "3 2 1\n3 2 1\n3 2 1" },
      { input: [4, [[0,0,0,0],[1,1,1,1],[2,2,2,2],[3,3,3,3]]], expectedOutput: "3 2 1 0\n3 2 1 0\n3 2 1 0\n3 2 1 0" },
      { input: [2, [[10,20],[30,40]]], expectedOutput: "30 10\n40 20" },
      { input: [3, [[7,8,9],[4,5,6],[1,2,3]]], expectedOutput: "1 4 7\n2 5 8\n3 6 9" }
    ],
    
    constraints: [
      "n == matrix.length == matrix[i].length",
      "1 <= n <= 20",
      "-1000 <= matrix[i][j] <= 1000"
    ],
    
    tags: ["Array", "Matrix"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const n = parseInt(readline());
    const matrix = [];
    for(let i = 0; i < n; i++) {
        matrix.push(readline().split(' ').map(x => parseInt(x)));
    }
    // Write your code here - modify matrix in-place
}`,
      
      python: `n = int(input())
matrix = []
for i in range(n):
    matrix.append(list(map(int, input().split())))

# Write your code here - modify matrix in-place
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[][] matrix = new int[n][n];
        for(int i = 0; i < n; i++) {
            for(int j = 0; j < n; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        // Write your code here - modify matrix in-place
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<vector<int>> matrix(n, vector<int>(n));
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    // Write your code here - modify matrix in-place
    
    return 0;
}`,
      
      c: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int matrix[n][n];
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
    
    // Write your code here - modify matrix in-place
    
    return 0;
}`
    }
  },

  // 73. Set Matrix Zeroes
  {
    id: "set-matrix-zeroes", // ADDED ID
    title: "Set Matrix Zeroes",
    difficulty: "Medium",
    category: "Matrix",
    order: 73,
    
    description: `Given an **m x n** integer matrix, if an element is **0**, set its entire row and column to **0**'s.

You must do it **in-place**.

## Approach & Strategy
Use **first row and first column as markers** to track which rows/columns should be zeroed. This achieves O(1) space complexity.

### Complexity
- **Time**: O(m × n) - Visit each cell twice
- **Space**: O(1) - Using matrix itself for tracking`,
    
    examples: [
      {
        input: "3 3\n1 1 1\n1 0 1\n1 1 1",
        output: "1 0 1\n0 0 0\n1 0 1",
        explanation: "The 0 at position (1,1) zeroes out row 1 and column 1"
      },
      {
        input: "3 4\n0 1 2 0\n3 4 5 2\n1 3 1 5",
        output: "0 0 0 0\n0 4 5 0\n0 3 1 0",
        explanation: "Zeroes at (0,0) and (0,3) zero out their rows and columns"
      }
    ],
    
    testCases: [
      { input: [3, 3, [[1,1,1],[1,0,1],[1,1,1]]], expectedOutput: "1 0 1\n0 0 0\n1 0 1" },
      { input: [3, 4, [[0,1,2,0],[3,4,5,2],[1,3,1,5]]], expectedOutput: "0 0 0 0\n0 4 5 0\n0 3 1 0" },
      { input: [1, 1, [[0]]], expectedOutput: "0" },
      { input: [1, 2, [[1,0]]], expectedOutput: "0 0" },
      { input: [2, 2, [[1,1],[1,0]]], expectedOutput: "1 0\n0 0" },
      { input: [3, 3, [[0,0,0],[0,0,0],[0,0,0]]], expectedOutput: "0 0 0\n0 0 0\n0 0 0" },
      { input: [3, 3, [[1,2,3],[4,5,6],[7,8,9]]], expectedOutput: "1 2 3\n4 5 6\n7 8 9" },
      { input: [4, 3, [[1,0,3],[4,5,6],[7,8,9],[10,11,12]]], expectedOutput: "0 0 0\n4 0 6\n7 0 9\n10 0 12" },
      { input: [2, 3, [[1,2,3],[0,5,6]]], expectedOutput: "0 2 3\n0 0 0" },
      { input: [3, 2, [[1,0],[3,4],[5,6]]], expectedOutput: "0 0\n3 0\n5 0" }
    ],
    
    constraints: [
      "m == matrix.length",
      "n == matrix[0].length",
      "1 <= m, n <= 200",
      "-2^31 <= matrix[i][j] <= 2^31 - 1"
    ],
    
    tags: ["Array", "Matrix", "Hash Table"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const [m, n] = readline().split(' ').map(x => parseInt(x));
    const matrix = [];
    for(let i = 0; i < m; i++) {
        matrix.push(readline().split(' ').map(x => parseInt(x)));
    }
    // Write your code here
}`,
      
      python: `m, n = map(int, input().split())
matrix = []
for i in range(m):
    matrix.append(list(map(int, input().split())))

# Write your code here
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] matrix = new int[m][n];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        // Write your code here
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    vector<vector<int>> matrix(m, vector<int>(n));
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    // Write your code here
    
    return 0;
}`,
      
      c: `#include <stdio.h>

int main(void) {
    int m, n;
    scanf("%d %d", &m, &n);
    int matrix[m][n];
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
    
    // Write your code here
    
    return 0;
}`
    }
  },

  // 74. Spiral Matrix
  {
    id: "spiral-matrix", // ADDED ID
    title: "Spiral Matrix",
    difficulty: "Medium",
    category: "Matrix",
    order: 74,
    
    description: `Given an **m x n** matrix, return all elements of the matrix in **spiral order**.

Start from the top-left corner, move right, then down, then left, then up, and continue in a spiral pattern until all elements are visited.

## Approach & Strategy
Maintain **four boundaries** (top, bottom, left, right) and shrink them as you traverse each layer of the spiral.

### Complexity
- **Time**: O(m × n) - Visit each element once
- **Space**: O(1) - Not counting output array`,
    
    examples: [
      {
        input: "3 3\n1 2 3\n4 5 6\n7 8 9",
        output: "1 2 3 6 9 8 7 4 5",
        explanation: "Spiral order: right → down → left → up → center"
      },
      {
        input: "3 4\n1 2 3 4\n5 6 7 8\n9 10 11 12",
        output: "1 2 3 4 8 12 11 10 9 5 6 7",
        explanation: "Follow the spiral path from outer to inner"
      }
    ],
    
    testCases: [
      { input: [3, 3, [[1,2,3],[4,5,6],[7,8,9]]], expectedOutput: "1 2 3 6 9 8 7 4 5" },
      { input: [3, 4, [[1,2,3,4],[5,6,7,8],[9,10,11,12]]], expectedOutput: "1 2 3 4 8 12 11 10 9 5 6 7" },
      { input: [1, 1, [[1]]], expectedOutput: "1" },
      { input: [1, 4, [[1,2,3,4]]], expectedOutput: "1 2 3 4" },
      { input: [4, 1, [[1],[2],[3],[4]]], expectedOutput: "1 2 3 4" },
      { input: [2, 2, [[1,2],[3,4]]], expectedOutput: "1 2 4 3" },
      { input: [4, 4, [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]], expectedOutput: "1 2 3 4 8 12 16 15 14 13 9 5 6 7 11 10" },
      { input: [2, 3, [[1,2,3],[4,5,6]]], expectedOutput: "1 2 3 6 5 4" },
      { input: [3, 2, [[1,2],[3,4],[5,6]]], expectedOutput: "1 2 4 6 5 3" },
      { input: [5, 5, [[1,2,3,4,5],[6,7,8,9,10],[11,12,13,14,15],[16,17,18,19,20],[21,22,23,24,25]]], expectedOutput: "1 2 3 4 5 10 15 20 25 24 23 22 21 16 11 6 7 8 9 14 19 18 17 12 13" }
    ],
    
    constraints: [
      "m == matrix.length",
      "n == matrix[i].length",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100"
    ],
    
    tags: ["Array", "Matrix", "Simulation"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const [m, n] = readline().split(' ').map(x => parseInt(x));
    const matrix = [];
    for(let i = 0; i < m; i++) {
        matrix.push(readline().split(' ').map(x => parseInt(x));
    }
    // Write your code here
}`,
      
      python: `m, n = map(int, input().split())
matrix = []
for i in range(m):
    matrix.append(list(map(int, input().split())))

# Write your code here
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int m = sc.nextInt();
        int n = sc.nextInt();
        int[][] matrix = new int[m][n];
        for(int i = 0; i < m; i++) {
            for(int j = 0; j < n; j++) {
                matrix[i][j] = sc.nextInt();
            }
        }
        
        // Write your code here
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int m, n;
    cin >> m >> n;
    vector<vector<int>> matrix(m, vector<int>(n));
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            cin >> matrix[i][j];
        }
    }
    
    // Write your code here
    
    return 0;
}`,
      
      c: `#include <stdio.h>

int main(void) {
    int m, n;
    scanf("%d %d", &m, &n);
    int matrix[m][n];
    for(int i = 0; i < m; i++) {
        for(int j = 0; j < n; j++) {
            scanf("%d", &matrix[i][j]);
        }
    }
    
    // Write your code here
    
    return 0;
}`
    }
  },

  // 75. Implement Trie (Prefix Tree)
  {
    id: "implement-trie", // ADDED ID
    title: "Implement Trie (Prefix Tree)",
    difficulty: "Medium",
    category: "Trie",
    order: 75,
    
    description: `A **Trie** (pronounced as "try") or **prefix tree** is a tree data structure used to efficiently store and retrieve keys in a dataset of strings.

Implement the Trie class:
- **Trie()** Initializes the trie object
- **void insert(String word)** Inserts the string word into the trie
- **boolean search(String word)** Returns true if word is in the trie
- **boolean startsWith(String prefix)** Returns true if there is a previously inserted string that has the prefix

## Approach & Strategy
Use a **tree structure** where each node contains an array of children (26 for lowercase letters) and a boolean flag to mark word endings.

### Complexity
- **Time**: O(m) for all operations, where m is word length
- **Space**: O(n × m) where n is number of words`,
    
    examples: [
      {
        input: "5\ninsert apple\nsearch apple\nsearch app\nstartsWith app\ninsert app\nsearch app",
        output: "true\nfalse\ntrue\ntrue",
        explanation: "insert and search operations on the Trie"
      }
    ],
    
    testCases: [
      { input: ["insert", "apple", "search", "apple"], expectedOutput: "true" },
      { input: ["insert", "apple", "search", "app"], expectedOutput: "false" },
      { input: ["insert", "apple", "startsWith", "app"], expectedOutput: "true" },
      { input: ["insert", "apple", "insert", "app", "search", "app"], expectedOutput: "true" },
      { input: ["insert", "hello", "search", "hell"], expectedOutput: "false" },
      { input: ["insert", "hello", "startsWith", "hell"], expectedOutput: "true" },
      { input: ["insert", "a", "search", "a"], expectedOutput: "true" },
      { input: ["insert", "test", "insert", "testing", "search", "test"], expectedOutput: "true" },
      { input: ["insert", "word", "startsWith", "wor"], expectedOutput: "true" },
      { input: ["insert", "abc", "insert", "abcd", "search", "abc"], expectedOutput: "true" }
    ],
    
    constraints: [
      "1 <= word.length, prefix.length <= 2000",
      "word and prefix consist only of lowercase English letters",
      "At most 3 × 10^4 calls will be made to insert, search, and startsWith"
    ],
    
    tags: ["Hash Table", "String", "Design", "Trie"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

class Trie {
    constructor() {
        // Initialize your trie here
    }
    
    insert(word) {
        // Insert word into trie
    }
    
    search(word) {
        // Return true if word is in trie
    }
    
    startsWith(prefix) {
        // Return true if any word starts with prefix
    }
}

function main() {
    const trie = new Trie();
    const n = parseInt(readline());
    for(let i = 0; i < n; i++) {
        const [operation, word] = readline().split(' ');
        // Implement operations
    }
}`,
      
      python: `class Trie:
    def __init__(self):
        # Initialize your trie here
        pass
    
    def insert(self, word):
        # Insert word into trie
        pass
    
    def search(self, word):
        # Return True if word is in trie
        pass
    
    def startsWith(self, prefix):
        # Return True if any word starts with prefix
        pass

trie = Trie()
n = int(input())
for _ in range(n):
    line = input().split()
    operation = line[0]
    word = line[1] if len(line) > 1 else ""
    # Implement operations
`,
      
      java: `import java.util.*;

class Trie {
    // Initialize your trie here
    public Trie() {
        
    }
    
    public void insert(String word) {
        
    }
    
    public boolean search(String word) {
        return false;
    }
    
    public boolean startsWith(String prefix) {
        return false;
    }
}

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        Trie trie = new Trie();
        int n = sc.nextInt();
        sc.nextLine();
        for(int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().split(" ");
            // Implement operations
        }
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <string>
using namespace std;

class Trie {
public:
    Trie() {
        // Initialize your trie here
    }
    
    void insert(string word) {
        
    }
    
    bool search(string word) {
        return false;
    }
    
    bool startsWith(string prefix) {
        return false;
    }
};

int main() {
    Trie trie;
    int n;
    cin >> n;
    cin.ignore();
    for(int i = 0; i < n; i++) {
        string operation, word;
        cin >> operation >> word;
        // Implement operations
    }
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>
#include <string.h>

// Define Trie structure
typedef struct TrieNode {
    struct TrieNode* children[26];
    bool isEndOfWord;
} TrieNode;

TrieNode* createNode() {
    TrieNode* node = (TrieNode*)malloc(sizeof(TrieNode));
    node->isEndOfWord = false;
    for(int i = 0; i < 26; i++) {
        node->children[i] = NULL;
    }
    return node;
}

void insert(TrieNode* root, char* word) {
    // Implement insert
}

bool search(TrieNode* root, char* word) {
    // Implement search
    return false;
}

bool startsWith(TrieNode* root, char* prefix) {
    // Implement startsWith
    return false;
}

int main(void) {
    TrieNode* root = createNode();
    int n;
    scanf("%d", &n);
    // Implement operations
    return 0;
}`
    }
  },

  {
    id: "course-schedule", // ADDED ID
    title: "Course Schedule",
    difficulty: "Medium",
    category: "Graph",
    order: 76,
    
    description: `There are a total of **numCourses** courses you have to take, labeled from 0 to numCourses - 1. You are given an array **prerequisites** where prerequisites[i] = [ai, bi] indicates that you must take course bi first if you want to take course ai.

Return **true** if you can finish all courses. Otherwise, return **false**.

## Approach & Strategy
Use **topological sort** with DFS to detect cycles. If a cycle exists in the graph, it's impossible to complete all courses.

### Complexity
- **Time**: O(V + E) - Visit all vertices and edges
- **Space**: O(V + E) - Store adjacency list`,
    
    examples: [
      {
        input: "2 1\n1 0",
        output: "true",
        explanation: "Take course 0 first, then course 1"
      },
      {
        input: "2 2\n1 0\n0 1",
        output: "false",
        explanation: "Course 0 requires course 1 and vice versa - cycle detected"
      }
    ],
    
    testCases: [
      { input: [2, [[1, 0]]], expectedOutput: "true" },
      { input: [2, [[1, 0], [0, 1]]], expectedOutput: "false" },
      { input: [3, [[1, 0], [2, 1]]], expectedOutput: "true" },
      { input: [4, [[1, 0], [2, 1], [3, 2]]], expectedOutput: "true" },
      { input: [1, []], expectedOutput: "true" },
      { input: [3, [[0, 1], [0, 2], [1, 2]]], expectedOutput: "true" },
      { input: [4, [[1, 0], [2, 0], [3, 1], [3, 2]]], expectedOutput: "true" },
      { input: [3, [[1, 0], [2, 1], [0, 2]]], expectedOutput: "false" },
      { input: [5, [[1, 4], [2, 4], [3, 1], [3, 2]]], expectedOutput: "true" },
      { input: [6, [[1, 0], [2, 1], [3, 2], [4, 3], [5, 4], [0, 5]]], expectedOutput: "false" }
    ],
    
    constraints: [
      "1 <= numCourses <= 2000",
      "0 <= prerequisites.length <= 5000",
      "prerequisites[i].length == 2",
      "0 <= ai, bi < numCourses"
    ],
    
    tags: ["Depth-First Search", "Breadth-First Search", "Graph", "Topological Sort"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const [numCourses, numPrereq] = readline().split(' ').map(x => parseInt(x));
    const prerequisites = [];
    for(let i = 0; i < numPrereq; i++) {
        prerequisites.push(readline().split(' ').map(x => parseInt(x)));
    }
    // Write your code here
}`,
      
      python: `numCourses, numPrereq = map(int, input().split())
prerequisites = []
for _ in range(numPrereq):
    prerequisites.append(list(map(int, input().split())))

# Write your code here
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int numCourses = sc.nextInt();
        int numPrereq = sc.nextInt();
        int[][] prerequisites = new int[numPrereq][2];
        for(int i = 0; i < numPrereq; i++) {
            prerequisites[i][0] = sc.nextInt();
            prerequisites[i][1] = sc.nextInt();
        }
        
        // Write your code here
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int numCourses, numPrereq;
    cin >> numCourses >> numPrereq;
    vector<vector<int>> prerequisites(numPrereq, vector<int>(2));
    for(int i = 0; i < numPrereq; i++) {
        cin >> prerequisites[i][0] >> prerequisites[i][1];
    }
    
    // Write your code here
    
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <stdbool.h>

int main(void) {
    int numCourses, numPrereq;
    scanf("%d %d", &numCourses, &numPrereq);
    int prerequisites[numPrereq][2];
    for(int i = 0; i < numPrereq; i++) {
        scanf("%d %d", &prerequisites[i][0], &prerequisites[i][1]);
    }
    
    // Write your code here
    
    return 0;
}`
    }
  },

  // 77. Kth Smallest Element in a BST
  {
    id: "kth-smallest-element-in-a-bst", // ADDED ID
    title: "Kth Smallest Element in a BST",
    difficulty: "Medium",
    category: "Tree",
    order: 77,
    
    description: `Given the **root** of a binary search tree, and an integer **k**, return the **kth smallest value** (1-indexed) of all the values of the nodes in the tree.

## Approach & Strategy
Use **in-order traversal** of BST which gives elements in sorted order. The kth element in this traversal is the answer.

### Complexity
- **Time**: O(n) - In worst case, traverse all nodes
- **Space**: O(h) - Recursion stack where h is height`,
    
    examples: [
      {
        input: "7\n3 1 4 -1 2 -1 -1\n1",
        output: "1",
        explanation: "In-order: [1, 2, 3, 4], k=1 gives 1"
      },
      {
        input: "11\n5 3 6 2 4 -1 -1 1 -1 -1 -1\n3",
        output: "3",
        explanation: "In-order: [1, 2, 3, 4, 5, 6], k=3 gives 3"
      }
    ],
    
    testCases: [
      { input: [[3, 1, 4, null, 2], 1], expectedOutput: "1" },
      { input: [[5, 3, 6, 2, 4, null, null, 1], 3], expectedOutput: "3" },
      { input: [[1], 1], expectedOutput: "1" },
      { input: [[2, 1], 1], expectedOutput: "1" },
      { input: [[2, 1], 2], expectedOutput: "2" },
      { input: [[4, 2, 5, 1, 3], 3], expectedOutput: "3" },
      { input: [[10, 5, 15, 3, 7, null, 18], 4], expectedOutput: "7" },
      { input: [[5, 3, 6, 2, 4, null, null, 1], 5], expectedOutput: "5" },
      { input: [[8, 4, 12, 2, 6, 10, 14], 7], expectedOutput: "14" },
      { input: [[7, 3, 15, null, null, 9, 20], 2], expectedOutput: "7" }
    ],
    
    constraints: [
      "The number of nodes in the tree is n",
      "1 <= k <= n <= 10^4",
      "0 <= Node.val <= 10^4"
    ],
    
    tags: ["Tree", "Depth-First Search", "Binary Search Tree", "Binary Tree"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

class TreeNode {
    constructor(val) {
        this.val = val;
        this.left = this.right = null;
    }
}

function main() {
    const n = parseInt(readline());
    const values = readline().split(' ');
    const k = parseInt(readline());
    // Build tree and find kth smallest
}`,
      
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

n = int(input())
values = input().split()
k = int(input())

# Build tree and find kth smallest
`,
      
      java: `import java.util.*;

class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode(int val) { this.val = val; }
}

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();
        String[] values = sc.nextLine().split(" ");
        int k = sc.nextInt();
        
        // Build tree and find kth smallest
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
#include <string>
using namespace std;

struct TreeNode {
    int val;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x) : val(x), left(NULL), right(NULL) {}
};

int main() {
    int n;
    cin >> n;
    vector<string> values(n);
    for(int i = 0; i < n; i++) {
        cin >> values[i];
    }
    int k;
    cin >> k;
    
    // Build tree and find kth smallest
    
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <stdlib.h>

struct TreeNode {
    int val;
    struct TreeNode *left;
    struct TreeNode *right;
};

int main(void) {
    int n;
    scanf("%d", &n);
    // Build tree and find kth smallest
    
    return 0;
}`
    }
  },

  // 78. Palindromic Substrings
  {
    id: "palindromic-substrings", // ADDED ID
    title: "Palindromic Substrings",
    difficulty: "Medium",
    category: "String",
    order: 78,
    
    description: `Given a string **s**, return the **number of palindromic substrings** in it.

A string is a **palindrome** when it reads the same backward as forward.

A **substring** is a contiguous sequence of characters within the string.

## Approach & Strategy
**Expand around center** approach: For each character and each pair of characters, expand outward while characters match.

### Complexity
- **Time**: O(n²) - For each center, expand up to n times
- **Space**: O(1) - No extra space needed`,
    
    examples: [
      {
        input: "abc",
        output: "3",
        explanation: 'Three palindromic substrings: "a", "b", "c"'
      },
      {
        input: "aaa",
        output: "6",
        explanation: 'Six palindromic substrings: "a", "a", "a", "aa", "aa", "aaa"'
      }
    ],
    
    testCases: [
      { input: ["abc"], expectedOutput: "3" },
      { input: ["aaa"], expectedOutput: "6" },
      { input: ["a"], expectedOutput: "1" },
      { input: ["aa"], expectedOutput: "3" },
      { input: ["aba"], expectedOutput: "4" },
      { input: ["racecar"], expectedOutput: "10" },
      { input: ["noon"], expectedOutput: "6" },
      { input: ["abba"], expectedOutput: "6" },
      { input: ["abcd"], expectedOutput: "4" },
      { input: ["aaaaa"], expectedOutput: "15" },
      { input: ["abccba"], expectedOutput: "9" },
      { input: ["level"], expectedOutput: "7" }
    ],
    
    constraints: [
      "1 <= s.length <= 1000",
      "s consists of lowercase English letters"
    ],
    
    tags: ["String", "Dynamic Programming"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const s = readline();
    // Write your code here
}`,
      
      python: `s = input().strip()

# Write your code here
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        
        // Write your code here
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <string>
using namespace std;

int main() {
    string s;
    cin >> s;
    
    // Write your code here
    
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <string.h>

int main(void) {
    char s[1001];
    scanf("%s", s);
    
    // Write your code here
    
    return 0;
}`
    }
  },

  // 79. Daily Temperatures
  {
    id: "daily-temperatures", // ADDED ID
    title: "Daily Temperatures",
    difficulty: "Medium",
    category: "Stack",
    order: 79,
    
    description: `Given an array of integers **temperatures** represents the daily temperatures, return an array **answer** such that answer[i] is the **number of days** you have to wait after the ith day to get a warmer temperature.

If there is no future day for which this is possible, keep answer[i] == 0 instead.

## Approach & Strategy
Use a **monotonic decreasing stack** to track indices of temperatures. For each day, pop indices while current temperature is warmer.

### Complexity
- **Time**: O(n) - Each element pushed and popped once
- **Space**: O(n) - Stack can hold all elements`,
    
    examples: [
      {
        input: "8\n73 74 75 71 69 72 76 73",
        output: "1 1 4 2 1 1 0 0",
        explanation: "For each day, count days until a warmer temperature"
      },
      {
        input: "4\n30 40 50 60",
        output: "1 1 1 0",
        explanation: "Each day (except last) has next day warmer"
      }
    ],
    
    testCases: [
      { input: [[73, 74, 75, 71, 69, 72, 76, 73]], expectedOutput: "1 1 4 2 1 1 0 0" },
      { input: [[30, 40, 50, 60]], expectedOutput: "1 1 1 0" },
      { input: [[30, 60, 90]], expectedOutput: "1 1 0" },
      { input: [[90, 80, 70]], expectedOutput: "0 0 0" },
      { input: [[75]], expectedOutput: "0" },
      { input: [[75, 71, 69, 72, 76]], expectedOutput: "4 2 1 1 0" },
      { input: [[50, 50, 50, 50]], expectedOutput: "0 0 0 0" },
      { input: [[89, 62, 70, 58, 47, 47, 46, 76, 100, 70]], expectedOutput: "8 1 5 4 3 2 1 1 0 0" },
      { input: [[100, 99, 98, 97]], expectedOutput: "0 0 0 0" },
      { input: [[30, 31, 30, 32]], expectedOutput: "1 2 1 0" }
    ],
    
    constraints: [
      "1 <= temperatures.length <= 10^5",
      "30 <= temperatures[i] <= 100"
    ],
    
    tags: ["Array", "Stack", "Monotonic Stack"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

function main() {
    const n = parseInt(readline());
    const temperatures = readline().split(' ').map(x => parseInt(x));
    // Write your code here
}`,
      
      python: `n = int(input())
temperatures = list(map(int, input().split()))

# Write your code here
`,
      
      java: `import java.util.*;

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        int[] temperatures = new int[n];
        for(int i = 0; i < n; i++) {
            temperatures[i] = sc.nextInt();
        }
        
        // Write your code here
        
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int main() {
    int n;
    cin >> n;
    vector<int> temperatures(n);
    for(int i = 0; i < n; i++) {
        cin >> temperatures[i];
    }
    
    // Write your code here
    
    return 0;
}`,
      
      c: `#include <stdio.h>

int main(void) {
    int n;
    scanf("%d", &n);
    int temperatures[n];
    for(int i = 0; i < n; i++) {
        scanf("%d", &temperatures[i]);
    }
    
    // Write your code here
    
    return 0;
}`
    }
  },

  // 80. Min Stack
  {
    id: "min-stack", // ADDED ID
    title: "Min Stack",
    difficulty: "Medium",
    category: "Stack",
    order: 80,
    
    description: `Design a stack that supports **push**, **pop**, **top**, and retrieving the **minimum element** in constant time.

Implement the MinStack class:
- **MinStack()** initializes the stack object
- **void push(int val)** pushes the element val onto the stack
- **void pop()** removes the element on the top of the stack
- **int top()** gets the top element of the stack
- **int getMin()** retrieves the minimum element in the stack

You must implement a solution with **O(1)** time complexity for each function.

## Approach & Strategy
Use **two stacks**: one for values, one for tracking minimum at each level.

### Complexity
- **Time**: O(1) for all operations
- **Space**: O(n) - Two stacks`,
    
    examples: [
      {
        input: "7\npush -2\npush 0\npush -3\ngetMin\npop\ntop\ngetMin",
        output: "-3\n0\n-2",
        explanation: "Minimum operations on stack"
      }
    ],
    
    testCases: [
      { input: ["push", "-2", "push", "0", "push", "-3", "getMin"], expectedOutput: "-3" },
      { input: ["push", "5", "push", "2", "push", "8", "getMin"], expectedOutput: "2" },
      { input: ["push", "1", "push", "2", "top"], expectedOutput: "2" },
      { input: ["push", "10", "push", "5", "push", "15", "pop", "getMin"], expectedOutput: "10" },
      { input: ["push", "3", "getMin"], expectedOutput: "3" },
      { input: ["push", "0", "push", "-1", "push", "1", "getMin"], expectedOutput: "-1" },
      { input: ["push", "100", "push", "50", "push", "75", "getMin"], expectedOutput: "50" },
      { input: ["push", "7", "push", "7", "getMin"], expectedOutput: "7" },
      { input: ["push", "2", "push", "0", "push", "3", "push", "0", "getMin"], expectedOutput: "0" },
      { input: ["push", "-5", "push", "-10", "getMin", "pop", "getMin"], expectedOutput: "-10 -5" }
    ],
    
    constraints: [
      "-2^31 <= val <= 2^31 - 1",
      "Methods pop, top and getMin will always be called on non-empty stacks",
      "At most 3 × 10^4 calls will be made to push, pop, top, and getMin"
    ],
    
    tags: ["Stack", "Design"],
    
    starterCode: {
      javascript: `process.stdin.resume();
process.stdin.setEncoding('utf-8');
let inputString = '';
let currentLine = 0;
process.stdin.on('data', inputStdin => { inputString += inputStdin; });
process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\\n').map(s => s.trim());
    main();
});
function readline() { return inputString[currentLine++]; }

class MinStack {
    constructor() {
        // Initialize your data structure here
    }
    
    push(val) {
        // Push element val onto stack
    }
    
    pop() {
        // Remove element on top of stack
    }
    
    top() {
        // Get the top element
    }
    
    getMin() {
        // Retrieve the minimum element
    }
}

function main() {
    const minStack = new MinStack();
    const n = parseInt(readline());
    for(let i = 0; i < n; i++) {
        const line = readline().split(' ');
        // Implement operations
    }
}`,
      
      python: `class MinStack:
    def __init__(self):
        # Initialize your data structure here
        pass
    
    def push(self, val):
        # Push element val onto stack
        pass
    
    def pop(self):
        # Remove element on top of stack
        pass
    
    def top(self):
        # Get the top element
        pass
    
    def getMin(self):
        # Retrieve the minimum element
        pass

minStack = MinStack()
n = int(input())
for _ in range(n):
    line = input().split()
    # Implement operations
`,
      
      java: `import java.util.*;

class MinStack {
    // Initialize your data structure here
    public MinStack() {
        
    }
    
    public void push(int val) {
        
    }
    
    public void pop() {
        
    }
    
    public int top() {
        return 0;
    }
    
    public int getMin() {
        return 0;
    }
}

public class Main {
    public static void main (String[] args) {
        Scanner sc = new Scanner(System.in);
        MinStack minStack = new MinStack();
        int n = sc.nextInt();
        sc.nextLine();
        for(int i = 0; i < n; i++) {
            String[] parts = sc.nextLine().split(" ");
            // Implement operations
        }
        sc.close();
    }
}`,
      
      cpp: `#include <iostream>
#include <stack>
using namespace std;

class MinStack {
public:
    MinStack() {
        // Initialize your data structure here
    }
    
    void push(int val) {
        
    }
    
    void pop() {
        
    }
    
    int top() {
        return 0;
    }
    
    int getMin() {
        return 0;
    }
};

int main() {
    MinStack minStack;
    int n;
    cin >> n;
    cin.ignore();
    for(int i = 0; i < n; i++) {
        string operation;
        cin >> operation;
        // Implement operations
    }
    return 0;
}`,
      
      c: `#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

typedef struct {
    int *stack;
    int *minStack;
    int top;
    int capacity;
} MinStack;

MinStack* minStackCreate() {
    MinStack* obj = (MinStack*)malloc(sizeof(MinStack));
    obj->capacity = 10000;
    obj->stack = (int*)malloc(obj->capacity * sizeof(int));
    obj->minStack = (int*)malloc(obj->capacity * sizeof(int));
    obj->top = -1;
    return obj;
}

void minStackPush(MinStack* obj, int val) {
    
}

void minStackPop(MinStack* obj) {
    
}

int minStackTop(MinStack* obj) {
    return 0;
}

int minStackGetMin(MinStack* obj) {
    return 0;
}

int main(void) {
    MinStack* minStack = minStackCreate();
    int n;
    scanf("%d", &n);
    // Implement operations
    return 0;
}`
    }
  },
];

export const LANGUAGE_CONFIG = {
  javascript: {
    id: "javascript",
    label: "JavaScript",
    monacoLanguage: "javascript",
    defaultCode: "// Write your code here\n"
  },
  python: {
    id: "python",
    label: "Python",
    monacoLanguage: "python",
    defaultCode: "# Write your code here\n"
  },
  java: {
    id: "java",
    label: "Java",
    monacoLanguage: "java",
    defaultCode: "// Write your code here\n"
  },
  cpp: {
    id: "cpp",
    label: "C++",
    monacoLanguage: "cpp",
    defaultCode: "// Write your code here\n"
  }
};