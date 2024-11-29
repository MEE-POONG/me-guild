import { useState, useEffect } from 'react';
import Image from 'next/image';

interface Comment {
    id: string;
    name: string;
    content: string;
    createdAt: string;
}

interface CommentSectionProps {
    articleId: string; // Use this to fetch comments for the specific news article
}

const CommentSection: React.FC<CommentSectionProps> = ({ articleId }) => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Fetch comments for the news article when the component mounts
        const fetchComments = async () => {
            try {
                const response = await fetch(`/api/comments?articleId=${articleId}`);
                const data = await response.json();
                setComments(data.comments);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching comments:', error);
                setLoading(false);
            }
        };

        fetchComments();
    }, [articleId]);

    const handleCommentSubmit = async () => {
        if (newComment.trim() === '' || name.trim() === '') {
            return;
        }

        try {
            const response = await fetch('/api/comments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ articleId, name, content: newComment }),
            });

            if (response.ok) {
                const newCommentData = await response.json();
                setComments((prevComments) => [...prevComments, newCommentData.comment]);
                setNewComment('');
                setName('');
            } else {
                console.error('Error posting comment');
            }
        } catch (error) {
            console.error('Error posting comment:', error);
        }
    };

    return (
        <div className="mt-8">
            <div className="flex items-center justify-center">
                <div className="w-10 border-t-4 border-gray-400"></div>
                <h2 className="mx-4 text-red-600 text-2xl font-bold whitespace-nowrap">
                    COM <span className="text-white">MENT</span>
                </h2>
                <div className="flex-grow border-t-4 border-gray-400"></div>
            </div>

            {/* Comment List */}
            {loading ? (
                <p>Loading comments...</p>
            ) : (
                <div className="mb-6">
                    {comments.map((comment) => (
                        <div key={comment.id} className="border-b border-gray-300 pb-2 mb-4">
                            {/* <p className="font-semibold">{comment.name}</p> */}
                            <p className="text-gray-600">{comment.content}</p>
                            <p className="text-gray-400 text-xs">{new Date(comment.createdAt).toLocaleString()}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Comment Form */}
            <div className="mb-4">
                <div className='flex gap-1 mb-1'>
                    <img src="" className='w-6 h-6 rounded-full' alt="" />
                    <p className='text-gray-50' >Name</p>
                </div>

                <textarea
                    placeholder="Write your comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="border p-2 w-full mb-2 rounded-md"
                />
                <button
                    onClick={handleCommentSubmit}
                    className="bg-teal-500 hover:bg-teal-400 text-white text-sm px-4 py-2 rounded-md"
                >
                    Comment
                </button>
            </div>
        </div>
    );
};

export default CommentSection;
