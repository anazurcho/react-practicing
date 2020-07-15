import React from "react";
import Navbar from "./components/navbar/navabar";
import { Route } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import MainPage from "./pages/main-page";
import { connect } from "react-redux";
import {Helmet} from "react-helmet";
import Jobs from "./components/home-content/jobs";
import JobsAutocomplete from "./components/home-content/jobs_autocomplete";
import UnusualTitles from "./components/home-content/unusual_titles";


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
                <Route path="/jobs" component={Jobs}/>
                <Route path="/unusual_titles" component={UnusualTitles}/>
                <Route path="/jobs_autocomplete" component={JobsAutocomplete}/>
        </div>
    );
}

const mapStateToProps = ( state ) => {
    return {
        theme: state.theme,
    };
}

export default connect(mapStateToProps)(App);