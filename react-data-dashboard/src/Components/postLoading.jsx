import React from "react";

function PostLoading(Component) {
    return function PostLoadingComponent({ isLoading, ...props }) {
        if (!isLoading) return <Component {...props} />;
        return (
            <p style={{ fontSize: '25px' }}>
                Hold on, fetching data might take some time :)
            </p>
        );
    };
}

export default PostLoading;