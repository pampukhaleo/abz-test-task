import React, {useEffect, useState} from 'react';
import UserCard from "./UserCard.component";
import Button from "./Button.component";

function UsersList() {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const [count, setCount] = useState(6)

    const handleClick = () => {
        setCount((prevValue) => prevValue + 12)
    }

    useEffect(() => {
        fetch(`https://frontend-test-assignment-api.abz.agency/api/v1/users?count=${count}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result.users);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
    }, [count])

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className='users-list'>
                <div className='users-list-title'>Working with GET request</div>
                <div className='users-items'>
                    {items
                        .map(item => (
                        <div className='user-item' key={item.id}>
                            <UserCard user={item}/>
                        </div>
                    ))}
                </div>
                <div style={{marginTop: "50px"}}>
                    {
                        count > items.length ?
                            null
                            :
                            <Button click={handleClick} text='Show More'/>
                    }
                </div>
            </div>

        );
    }
}

export default UsersList;