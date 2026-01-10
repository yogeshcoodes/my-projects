function handleFollow() {
  const btn = document.getElementById("followBtn");

  // Open GitHub in new tab
  window.open("https://github.com/yogeshcoodes", "_blank");

  // Change to "Following" after 1.5 seconds
  setTimeout(() => {
    btn.classList.add("following");
    btn.textContent = "Following";
  }, 1500);
}

function toggleLike(btn) {
  btn.classList.toggle("liked");
  const count = btn.querySelector(".like-count");
  const currentCount = parseInt(count.textContent);
  count.textContent = btn.classList.contains("liked")
    ? currentCount + 1
    : currentCount - 1;
}

function toggleComments(btn) {
  const card = btn.closest(".project-card");
  const commentSection = card.querySelector(".comment-section");
  commentSection.classList.toggle("active");
}

function postComment(btn) {
  const card = btn.closest(".project-card");
  const input = card.querySelector(".comment-input");
  const commentText = input.value.trim();

  if (commentText === "") {
    alert("Please write a comment before posting!");
    return;
  }

  const commentsList = card.querySelector(".comments-list");
  const commentItem = document.createElement("div");
  commentItem.className = "comment-item";
  commentItem.innerHTML = `
                <div class="comment-author">You</div>
                <div>${commentText}</div>
            `;

  commentsList.appendChild(commentItem);

  // Update comment count
  const commentCount = card.querySelector(".comment-count");
  const currentCount = parseInt(commentCount.textContent);
  commentCount.textContent = currentCount + 1;

  // Clear input
  input.value = "";

  // Auto scroll to bottom of comments
  commentsList.scrollTop = commentsList.scrollHeight;
}

function shareProject(url, btn) {
  // Copy link to clipboard
  navigator.clipboard
    .writeText(url)
    .then(() => {
      // Show tooltip
      const tooltip = btn.querySelector(".link-copied-tooltip");
      tooltip.classList.add("show");

      // Hide tooltip after 2 seconds
      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 2000);
    })
    .catch(() => {
      // Fallback method for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = url;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);

      // Show tooltip
      const tooltip = btn.querySelector(".link-copied-tooltip");
      tooltip.classList.add("show");

      // Hide tooltip after 2 seconds
      setTimeout(() => {
        tooltip.classList.remove("show");
      }, 2000);
    });
}
