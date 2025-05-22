const INSTAGRAM_TOKEN = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
const INSTAGRAM_USER_ID = 'YOUR_INSTAGRAM_USER_ID';

async function fetchInstagramPosts() {
    try {
        const response = await fetch(
            `https://graph.instagram.com/v12.0/${INSTAGRAM_USER_ID}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${INSTAGRAM_TOKEN}&limit=6`
        );
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('インスタグラム投稿の取得に失敗しました:', error);
        return [];
    }
}

function displayInstagramPosts(posts) {
    const container = document.getElementById('instagram-feed');
    container.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('a');
        postElement.href = post.permalink;
        postElement.target = '_blank';
        postElement.rel = 'noopener noreferrer';

        const image = document.createElement('img');
        image.src = post.media_type === 'VIDEO' ? post.thumbnail_url : post.media_url;
        image.alt = post.caption ? post.caption.slice(0, 100) : 'Instagram post';

        postElement.appendChild(image);
        container.appendChild(postElement);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const posts = await fetchInstagramPosts();
    displayInstagramPosts(posts);
}); 