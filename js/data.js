// Dummy Data for Tinkle

window.tinkleData = {
    currentUserId: "1", // Simulate logged-in user (user1)
    users: [
        {
            id: "1",
            name: "Alice Johnson",
            username: "alicej",
            profilePic: "https://randomuser.me/api/portraits/women/68.jpg",
            bio: "Frontend developer. Coffee lover. Cat mom.",
            followers: ["2"],
            following: ["2", "3"]
        },
        {
            id: "2",
            name: "Brian Lee",
            username: "brianl",
            profilePic: "https://randomuser.me/api/portraits/men/65.jpg",
            bio: "Photographer & traveler. Exploring the world.",
            followers: ["1", "3"],
            following: ["1"]
        },
        {
            id: "3",
            name: "Cathy Smith",
            username: "cathys",
            profilePic: "https://randomuser.me/api/portraits/women/65.jpg",
            bio: "UI/UX designer. Dream in colors.",
            followers: [],
            following: ["1", "2"]
        }
    ],
    posts: [
        // Alice's posts
        {
            id: "p1",
            userId: "1",
            content: "Just finished a new React project! 🚀",
            image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
            likes: ["2", "3"],
            comments: [
                { userId: "2", text: "Congrats! Looks awesome." },
                { userId: "3", text: "Great job, Alice!" }
            ],
            createdAt: "2024-06-01T10:00:00Z"
        },
        {
            id: "p2",
            userId: "1",
            content: "Morning coffee and code ☕💻",
            image: "",
            likes: ["2"],
            comments: [
                { userId: "2", text: "Best way to start the day!" },
                { userId: "3", text: "Enjoy!" }
            ],
            createdAt: "2024-06-02T08:30:00Z"
        },
        // Brian's posts
        {
            id: "p3",
            userId: "2",
            content: "Sunset at the beach yesterday. 🌅",
            image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
            likes: ["1", "3"],
            comments: [
                { userId: "1", text: "Wow, beautiful shot!" },
                { userId: "3", text: "Love this view." }
            ],
            createdAt: "2024-06-03T19:00:00Z"
        },
        {
            id: "p4",
            userId: "2",
            content: "Exploring the old town. 🏘️",
            image: "",
            likes: ["3"],
            comments: [
                { userId: "3", text: "Looks charming!" },
                { userId: "1", text: "Wish I was there!" }
            ],
            createdAt: "2024-06-04T11:15:00Z"
        },
        // Cathy's posts
        {
            id: "p5",
            userId: "3",
            content: "Designing a new app interface. Inspiration everywhere!",
            image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
            likes: ["1"],
            comments: [
                { userId: "1", text: "Can't wait to see it!" },
                { userId: "2", text: "You rock, Cathy!" }
            ],
            createdAt: "2024-06-05T15:40:00Z"
        },
        {
            id: "p6",
            userId: "3",
            content: "Color palettes make me happy 🎨",
            image: "",
            likes: [],
            comments: [
                { userId: "1", text: "So vibrant!" },
                { userId: "2", text: "Love your style." }
            ],
            createdAt: "2024-06-06T09:10:00Z"
        }
    ]
};