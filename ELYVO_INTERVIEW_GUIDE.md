# 🏆 EPAM Systems Technical & Behavioral Interview Q&A Guide

This guide contains a highly readable, direct Question & Answer prep catalog tailored to EPAM Systems interviews, drawing connections to the design, challenges, and code of **Elyvo**.

---

## 📂 Section 1: Algorithmic & Coding Questions (DSA)

### Q1: How do you implement a level-order traversal of a binary tree?

**Answer:**
To traverse a binary tree level-by-level (Breadth-First Search), we use an iterative queue-based approach. We avoid recursive DFS here because BFS naturally processes level-by-level and prevents deep recursion call stack overflows.

**JavaScript Implementation:**
```javascript
function levelOrder(root) {
  if (!root) return [];
  
  const result = [];
  const queue = [root];
  
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  
  return result;
}
```

**Complexity Analysis:**
* **Time Complexity:** $\mathcal{O}(N)$ — We visit each of the $N$ nodes in the tree exactly once.
* **Space Complexity:** $\mathcal{O}(W)$ — Where $W$ is the maximum width of the tree. In a balanced binary tree, the queue holds up to $N/2$ leaf nodes at the bottom level.

**Critical Edge Cases to Mention:**
1. **Empty Tree:** If `root` is null, immediately return `[]` to prevent runtime errors.
2. **Skewed Tree (Linked List structure):** The queue size remains $\mathcal{O}(1)$ at any point, making it highly memory efficient compared to recursion.

---

### Q2: How do you merge overlapping intervals?

**Answer:**
We sort the intervals by their start times first. This allows us to resolve overlaps in a single linear pass by checking if the start of the current interval is less than or equal to the end of the previously merged interval.

**Python Implementation:**
```python
def merge_intervals(intervals):
    if not intervals:
        return []
        
    # Sort intervals by start time
    intervals.sort(key=lambda x: x[0])
    
    merged = [intervals[0]]
    for current in intervals[1:]:
        prev = merged[-1]
        
        # If current interval overlaps with previous, merge them
        if current[0] <= prev[1]:
            prev[1] = max(prev[1], current[1])
        else:
            merged.append(current)
            
    return merged
```

**Complexity Analysis:**
* **Time Complexity:** $\mathcal{O}(N \log N)$ — Dominated by sorting the $N$ intervals. The subsequent linear scan takes $\mathcal{O}(N)$ time.
* **Space Complexity:** $\mathcal{O}(N)$ or $\mathcal{O}(\log N)$ — Used to store the sorted output or system stack space for sorting.

**Critical Edge Cases to Mention:**
1. **No Intervals:** Return an empty array `[]` immediately.
2. **Total Overlap:** A single large interval containing many smaller ones (e.g., `[[1, 10], [2, 5], [6, 8]]`) merges correctly into `[[1, 10]]`.

---

### Q3: How do you find the number of islands in a 2D binary grid?

**Answer:**
We can represent the grid as an unweighted graph and perform a Depth-First Search (DFS) or Breadth-First Search (BFS) whenever we encounter land (`'1'`). During traversal, we "sink" the land by changing `'1'`s to `'0'`s to avoid infinite cycles and redundant checks.

**JavaScript Implementation:**
```javascript
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  
  let islandCount = 0;
  const rows = grid.length;
  const cols = grid[0].length;
  
  function dfs(r, c) {
    // Boundary check and water check
    if (r < 0 || c < 0 || r >= rows || c >= cols || grid[r][c] !== '1') {
      return;
    }
    
    // Mark as visited by sinking the land
    grid[r][c] = '0';
    
    // Visit all 4 adjacent directions
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }
  
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        islandCount++;
        dfs(r, c);
      }
    }
  }
  
  return islandCount;
}
```

**Complexity Analysis:**
* **Time Complexity:** $\mathcal{O}(R \times C)$ — Where $R$ is rows and $C$ is columns. We scan each cell in the grid.
* **Space Complexity:** $\mathcal{O}(R \times C)$ — In the worst case where the grid is filled entirely with land, the call stack can go as deep as the total number of cells.

**Critical Edge Cases to Mention:**
1. **Grid Side-Effects:** Mutating the input matrix might not be acceptable in all production environments. In an interview, ask if mutating the grid is allowed or if you should use an auxiliary `visited` set/matrix.

---

### Q4: How do you find the length of the longest substring without repeating characters?

**Answer:**
We use a sliding window approach with a hash map to track the most recent index of each character. This allows us to adjust the start index of our window without resetting the loop, achieving a linear runtime.

**Python Implementation:**
```python
def length_of_longest_substring(s):
    char_map = {}
    max_length = 0
    start = 0
    
    for end, char in enumerate(s):
        # If character is repeating and lies within current window
        if char in char_map and char_map[char] >= start:
            start = char_map[char] + 1
            
        char_map[char] = end
        max_length = max(max_length, end - start + 1)
        
    return max_length
```

**Complexity Analysis:**
* **Time Complexity:** $\mathcal{O}(N)$ — Where $N$ is the length of the string. The `end` pointer scans the string exactly once.
* **Space Complexity:** $\mathcal{O}(\min(M, N))$ — Where $M$ is the size of the character alphabet (e.g., 26 for lowercase English letters, 128 for ASCII).

---

## 🖥️ Section 2: System Design & Project Architecture Q&A

### Q5: How does Elyvo handle real-time code editor synchronization between candidates and interviewers?

**Answer:**
1. **WebSocket Infrastructure:** Elyvo uses a persistent `Socket.io` channel between the React client and Express server.
2. **Event-Driven Exchange:** The Monaco editor client registers an `onChange` listener. When edits occur, the client translates them to operational data diffs (not the whole file text) and emits an editor update event.
3. **Optimized Broadcasting:** The backend room controller receives this event, validates the user's room parameters, updates the MongoDB document, and broadcasts the event to the other peer connected to the same session channel.

---

### Q6: How does the application securely integrate real-time video, audio, and chat stream endpoints?

**Answer:**
* **Service Decoupling:** Instead of hosting raw WebRTC streams on our server, we offload media hosting to Stream.io.
* **Secure Token Minting:** On the backend, we created a protected route `/api/sessions` that acts as a token mint. When a session is initiated, the server uses the secret `STREAM_API_SECRET` to sign a JWT containing the user identity.
* **Safe Lifetime Bounds:** The generated token is configured with a custom, long-lasting validity window matching the interview session duration, ensuring candidates are never dropped mid-interview.

---

### Q7: How do you execute candidate-submitted code on the server without introducing security vulnerabilities?

**Answer:**
* **Sandbox Isolation:** We do not execute code natively on the server shell. Instead, code execution is delegated to an isolated runtime sandbox (Piston engine).
* **Network Decoupling:** The Express backend receives the code payload (language, source string, and inputs), sanitizes the data structure, and routes it to the sandboxed runtime environment.
* **Execution Validation:** The sandbox compiles/interprets the code under strict resource constraints (timeout limits, memory ceiling, blocked system calls), and returns clean stdout/stderr strings back to our backend.

---

## 💬 Section 3: Situational & Behavioral Questions (STAR Method)

### Q8: Describe a time a third-party dependency or API broke unexpectedly. How did you handle it?

**Answer:**
* **Situation:** During the system integration phase, the AI Roast feature broke with a `404 invalid_request_error`. Groq had retired the `llama-3.3-70b-versatile` LLM model model we were using.
* **Task:** I had to restore AI services across the codebase (roasts, reviews, hints) without breaking the app or changing the frontend interface.
* **Action:** 
  1. I audited the AI services code (`ai.services.js`) and located the deprecated references.
  2. I mapped all calls to Groq's active model `llama3-70b-8192`.
  3. I revised the API response parsers to ensure matching output structures.
  4. I updated the frontend `DailyRoast` card with a gold loading skeleton state to cleanly catch fallback text if the model server ever rate-limits.
* **Result:** All endpoints compiled cleanly, test requests returned a 100% success rate, and AI services were restored without user-facing disruption.

---

### Q9: How do you manage latency and client-side performance issues during rapid state updates?

**Answer:**
* **Situation:** Marking coding challenges "solved" required a round-trip database update to MongoDB. On high-latency connections, clicking "solved" took up to 800ms to show feedback on the navbar status badges.
* **Task:** Make the user experience instantaneous while maintaining eventually consistent database state.
* **Action:** I introduced a **Local-First state synchronization pattern**:
  1. On click, the app immediately writes the updated state to a React context and syncs it with the browser's local storage.
  2. A global custom event `solvedProblemsUpdated` is dispatched to force immediate navbar updates ($<5\text{ms}$).
  3. The database write call is sent in the background as an asynchronous, non-blocking fetch.
* **Result:** Page updates became instant for the user, hiding API latency entirely.

---

### Q10: How do you handle vague or ambiguous project requirements?

**Answer:**
* **Situation:** I was asked to: *"Change the UI of the whole website, make it beautiful, bug-free, and add a company-wise process section."*
* **Task:** Define the exact styling architecture and layout details without slowing down progress.
* **Action:** 
  1. I drew up an implementation plan detailing the pages to modify.
  2. I established a cohesive theme system: "Golden Dark", using HSL variables (`--gold`, `--bg-main`).
  3. I created unified components (like `Logo.jsx` and vector company logos) to ensure visual consistency.
  4. I reviewed every router path and code compile output to guarantee zero regressions.
* **Result:** The entire frontend was converted to a premium golden dark interface, client builds succeeded with 0 errors, and the changes were deployed to GitHub immediately.

---

### Q11: How do you resolve technical disagreements regarding design patterns or coding standards?

**Answer:**
* **Situation:** During the design overhaul, there was a disagreement between using global CSS variables vs. inline CSS attributes. Inline styles offered localized speed, while global styles offered long-term maintainability.
* **Task:** Reconcile these styles to maintain code quality while working quickly.
* **Action:** I proposed a **hybrid design guideline**:
  1. We registered all core layout tokens (colors, gradients, glass effects) as global CSS variables in `index.css`.
  2. We limited inline styles only to localized animation behaviors (like staggered entrance animation delays).
* **Result:** Both concerns were resolved: developers could easily change themes globally, and custom page animations remained clean and self-contained.
