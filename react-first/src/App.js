import React from "react";
import Navbar from "./components/navbar/navabar";
import { Route } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import MainPage from "./pages/main-page";
import { connect } from "react-redux";
import {Helmet} from "react-helmet";
import Posts from "./components/home-content/posts";
import Photos from "./components/home-content/photos";
import Users from "./components/home-content/users";


const App = ({theme}) => {
    var realTheme = ("");
  
    if (theme==='minty'){
        realTheme=(
            <Helmet>
                <link rel="stylesheet" href="https://bootswatch.com/4/darkly/bootstrap.min.css" />
            </Helmet>
        )
    }else{
         realTheme=(
            <Helmet>
                <link rel="stylesheet" href="https://bootswatch.com/4/journal/bootstrap.min.css" />
            </Helmet>
        )
    }
 
    return (
        <div>
            {realTheme}
            <Navbar />
              <Route path="/" component={MainPage} exact/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/posts" component={Posts}/>
                <Route path="/users" component={Users}/>
                <Route path="/photos" component={Photos}/>
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return {
        theme: state.theme,
    };
}

export default connect(mapStateToProps)(App);