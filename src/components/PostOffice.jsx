/* eslint-disable react/prop-types */
export default function PostOffice({ postOffice }) {
    return (
        <div>
            {postOffice.length > 0 && postOffice.map((post, index) => (
                <div key={index}> 
                    {post} 
                </div>
            ))}
        </div>
    );
}