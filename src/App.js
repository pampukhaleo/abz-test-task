import React from 'react';

import Header from "./components/Header.component";
import MainBlock from "./components/MainBlock.component";
import UsersList from "./components/UsersList.component";
import SignUpForm from "./components/SignUpForm.component";

function App(props) {
    return (
        <div>
            <Header />
            <MainBlock />
            <UsersList />
            <SignUpForm />
        </div>
    );
}

export default App;