// Utility functions

function getUserById(userId) {
    return window.tinkleData.users.find(u => u.id === userId);
}

function getPostById(postId) {
    return window.tinkleData.posts.find(p => p.id === postId);
}

function isFollowing(currentUserId, targetUserId) {
    const user = getUserById(currentUserId);
    return user.following.includes(targetUserId);
}

function isLiked(post, currentUserId) {
    return post.likes.includes(currentUserId);
}

function formatDate(dateStr) {
    const d = new Date(dateStr);
    return d.toLocaleDateString() + ' ' + d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
}

// Render current user profile card (sidebar)
function renderCurrentUserProfile() {
    const user = getUserById(window.tinkleData.currentUserId);
    if (!user) return;
    document.getElementById('current-user-profile').innerHTML = `
        <img class="profile-pic" src="${user.profilePic}" alt="${user.name}">
        <div class="profile-name">${user.name}</div>
        <div class="profile-bio">${user.bio}</div>
        <div class="profile-stats">
            <div><strong>${user.followers.length}</strong> Followers</div>
            <div><strong>${user.following.length}</strong> Following</div>
        </div>
        <a href="profile.html?id=${user.id}" class="btn secondary small">View Profile</a>
    `;
}

// Render feed posts (all users)
function renderFeedPosts() {
    const posts = window.tinkleData.posts
        .slice()
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const feedEl = document.getElementById('feed-posts');
    if (!feedEl) return;
    feedEl.innerHTML = '';
    posts.forEach(post => {
        feedEl.appendChild(createPostElement(post));
    });
}

// Render posts for a specific user
function renderUserPosts(userId, containerId) {
    const posts = window.tinkleData.posts
        .filter(p => p.userId === userId)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const postsEl = document.getElementById(containerId);
    if (!postsEl) return;
    postsEl.innerHTML = '';
    posts.forEach(post => {
        postsEl.appendChild(createPostElement(post, true));
    });
}

// Create post DOM element
function createPostElement(post, isProfilePage = false) {
    const user = getUserById(post.userId);
    const currentUserId = window.tinkleData.currentUserId;
    const liked = isLiked(post, currentUserId);

    // Comments section
    const commentsHtml = post.comments.map(c => {
        const cu = getUserById(c.userId);
        return `
            <div class="comment">
                <img class="comment-pic" src="${cu.profilePic}" alt="${cu.name}">
                <div class="comment-content"><strong>${cu.name.split(' ')[0]}:</strong> ${c.text}</div>
            </div>
        `;
    }).join('');

    // Post image
    const postImageHtml = post.image ? `<img class="feed-post-image" src="${post.image}" alt="Post image">` : '';

    // Like button
    const likeBtnClass = liked ? 'like-btn liked' : 'like-btn';
    const likeIcon = liked ? '❤️' : '🤍';

    // Comment section (expand/collapse)
    const postEl = document.createElement('div');
    postEl.className = isProfilePage ? 'profile-post' : 'feed-post';
    postEl.innerHTML = `
        <div class="feed-post-header">
            <a href="profile.html?id=${user.id}">
                <img class="profile-pic" src="${user.profilePic}" alt="${user.name}">
            </a>
            <div>
                <a href="profile.html?id=${user.id}" class="user-name">${user.name}</a><br>
                <span class="post-date">${formatDate(post.createdAt)}</span>
            </div>
        </div>
        <div class="feed-post-content">${post.content}</div>
        ${postImageHtml}
        <div class="feed-post-actions">
            <button class="${likeBtnClass}" data-postid="${post.id}">
                <span class="like-icon">${likeIcon}</span>
                <span class="like-count">${post.likes.length}</span>
            </button>
            <button class="comment-btn" data-postid="${post.id}">
                💬 <span class="comment-count">${post.comments.length}</span>
            </button>
        </div>
        <div class="comments-section" id="comments-${post.id}" style="display:none;">
            <div class="comments-list">${commentsHtml}</div>
            <form class="add-comment-form" data-postid="${post.id}">
                <input type="text" placeholder="Add a comment..." maxlength="120" required>
                <button type="submit" class="btn small">Post</button>
            </form>
        </div>
    `;
    return postEl;
}

// Like/unlike post
function toggleLike(postId) {
    const post = getPostById(postId);
    const currentUserId = window.tinkleData.currentUserId;
    const idx = post.likes.indexOf(currentUserId);
    if (idx >= 0) {
        post.likes.splice(idx, 1);
    } else {
        post.likes.push(currentUserId);
    }
}

// Toggle comment section
function toggleComments(postId) {
    const section = document.getElementById('comments-' + postId);
    if (!section) return;
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
    // Highlight comment button
    const btns = document.querySelectorAll(`.comment-btn[data-postid="${postId}"]`);
    btns.forEach(btn => btn.classList.toggle('active', section.style.display === 'block'));
}

// Add comment to post (frontend only)
function addComment(postId, text) {
    const post = getPostById(postId);
    post.comments.push({
        userId: window.tinkleData.currentUserId,
        text: text
    });
}

// Follow/unfollow user
function toggleFollow(targetUserId) {
    const currentUser = getUserById(window.tinkleData.currentUserId);
    const targetUser = getUserById(targetUserId);
    const idx = currentUser.following.indexOf(targetUserId);
    if (idx >= 0) {
        currentUser.following.splice(idx, 1);
        // Remove follower from target
        const fidx = targetUser.followers.indexOf(currentUser.id);
        if (fidx >= 0) targetUser.followers.splice(fidx, 1);
    } else {
        currentUser.following.push(targetUserId);
        targetUser.followers.push(currentUser.id);
    }
}

// Render profile page
function renderProfilePage(userId) {
    const user = getUserById(userId);
    if (!user) return;
    // Profile details
    const currentUserId = window.tinkleData.currentUserId;
    const isSelf = userId === currentUserId;
    const isFollowingUser = isFollowing(currentUserId, userId);

    document.getElementById('profile-details').innerHTML = `
        <div class="profile-card">
            <img class="profile-pic" src="${user.profilePic}" alt="${user.name}">
            <div class="profile-name">${user.name}</div>
            <div class="profile-bio">${user.bio}</div>
            <div class="profile-stats">
                <div><strong>${user.followers.length}</strong> Followers</div>
                <div><strong>${user.following.length}</strong> Following</div>
            </div>
            ${isSelf ? '' : `
                <button class="btn ${isFollowingUser ? '' : 'secondary'}" id="follow-btn" data-userid="${user.id}">
                    ${isFollowingUser ? 'Unfollow' : 'Follow'}
                </button>
            `}
        </div>
    `;
    renderUserPosts(userId, 'profile-posts');
}

// Event delegation for feed/profile posts
document.addEventListener('click', function(e) {
    // Like button
    if (e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        const postId = btn.getAttribute('data-postid');
        toggleLike(postId);
        // Rerender posts
        if (document.getElementById('feed-posts')) renderFeedPosts();
        if (document.getElementById('profile-posts')) {
            const params = new URLSearchParams(window.location.search);
            const userId = params.get('id') || window.localStorage.getItem('profileUserId') || '1';
            renderUserPosts(userId, 'profile-posts');
        }
    }
    // Comment button
    if (e.target.closest('.comment-btn')) {
        const btn = e.target.closest('.comment-btn');
        const postId = btn.getAttribute('data-postid');
        toggleComments(postId);
    }
    // Follow/unfollow button
    if (e.target.id === 'follow-btn') {
        const userId = e.target.getAttribute('data-userid');
        toggleFollow(userId);
        renderProfilePage(userId);
    }
});

// Handle add comment forms
document.addEventListener('submit', function(e) {
    if (e.target.classList.contains('add-comment-form')) {
        e.preventDefault();
        const postId = e.target.getAttribute('data-postid');
        const input = e.target.querySelector('input[type="text"]');
        const text = input.value.trim();
        if (text) {
            addComment(postId, text);
            input.value = '';
            // Rerender comments
            if (document.getElementById('feed-posts')) renderFeedPosts();
            if (document.getElementById('profile-posts')) {
                const params = new URLSearchParams(window.location.search);
                const userId = params.get('id') || window.localStorage.getItem('profileUserId') || '1';
                renderUserPosts(userId, 'profile-posts');
            }
            // Expand comments section
            toggleComments(postId);
            toggleComments(postId);
        }
    }
});

// On page load
document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('current-user-profile')) {
        renderCurrentUserProfile();
    }
    if (document.getElementById('feed-posts')) {
        renderFeedPosts();
    }
});