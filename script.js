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

function shareProject(url) {
  // Try to use Web Share API if available
  if (navigator.share) {
    navigator
      .share({
        title: "Check out this project!",
        url: url,
      })
      .catch((err) => {
        // If user cancels, just copy to clipboard
        copyToClipboard(url);
      });
  } else {
    // Fallback to copying to clipboard
    copyToClipboard(url);
  }
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("Project link copied to clipboard!");
    })
    .catch(() => {
      // Fallback method
      const textarea = document.createElement("textarea");
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      alert("Project link copied to clipboard!");
    });
}
