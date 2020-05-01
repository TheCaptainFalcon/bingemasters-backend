import React from 'react';
import styled from 'styled-components';
import another_retro_tv from '../another_retro_tv.png';
import HomePage from './HomePage';
import tv_static2 from '../tv_static2.jpg';
import axios from 'axios';
import Modal from './Modal';
import PostScore from './PostScore';
import { connect } from 'react-redux';

const StartGameBackground = styled.div`
    background: url(${another_retro_tv}) no-repeat center center fixed;
    background-size: 80vw 92vh;
    height: 100vh; 
    @media screen and (max-width: 850px) {
        background: url(${tv_static2}) no-repeat center center fixed;
        background-size: cover;
        height: 100vh;
    }
`
const StyledStartGame = styled.div`
    display: flex;
    align-items: center;
    flex-flow: column;
    width: 700px;
    height: 700px;
    margin: 0 auto;
    position: relative;
    top: 100px;
    right: 150px;
    @media screen and (max-width: 1430px) {
        margin: 0 390px;
        width: 700px;
        height: 700px;
    }
    @media screen and (max-width: 1400px) {
        margin: 0 380px;
        width: 660px;
        height: 660px;
    }
    @media screen and (max-width: 1390px) {
        margin: 0 370px;
        width: 620px;
        height: 620px;
    }
    @media screen and (max-width: 1340px) {
        margin: 0 370px;
        width: 580px;
        height: 580px;
    }
    @media screen and (max-width: 1290px) {
        margin: 0 360px;
        width: 540px;
        height: 540px;
    }
    @media screen and (max-width: 1240px) {
        margin: 0 360px;
        width: 500px;
        height: 500px;
    }
    @media screen and (max-width: 1190px) {
        margin: 0 360px;
        width: 460px;
        height: 460px;
    }
    @media screen and (max-width: 1140px) {
        margin: 0 360px;
        width: 420px;
        height: 420px;
    }
    @media screen and (max-width: 1090px) {
        margin: 0 340px;
        width: 420px;
        height: 420px;
    }
    @media screen and (max-width: 1040px) {
        margin: 0 340px;
        width: 400px;
        height: 400px;
    }
    @media screen and (max-width: 990px) {
        margin: 0 320px;
        width: 380px;
        height: 380px;
    }
    @media screen and (max-width: 940px) {
        margin: 0 320px;
        width: 360px;
        height: 360px;
    }
    @media screen and (max-width: 890px) {
        margin: 0 300px;
        width: 340px;
        height: 340px;
    }
    @media screen and (max-width: 850px) {
        margin: 0 280px;
        width: 480px;
        height: 480px;
    }
    @media screen and (max-width: 840px) {
        margin: 0 280px;
    }
    @media screen and (max-width: 790px) {
        margin: 0 260px;
        width: 460px;
        height: 460px;
    }
    @media screen and (max-width: 740px) {
        margin: 0 240px;
        width: 440px;
        height: 440px;
    }
    @media screen and (max-width: 690px) {
        margin: 0 220px;
        width: 420px;
        height: 420px;
    }
    @media screen and (max-width: 640px) {
        margin: 0 200px;
        width: 400px;
        height: 400px;
    }
`;

const LeaderboardTitle = styled.h1`
    font-family: 'Retro', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 48px;
    text-align: center;
    position: relative;
    left: 15px;
    @media screen and (max-width: 1400px) {
        font-size: 42px;
    }
    @media screen and (max-width: 1200px) {
        font-size: 36px;
        position: relative;
        left: 20px;
    }
    @media screen and (max-width: 1000px) {
        font-size: 32px;
        position: relative;
        left: 20px;
    }
    @media screen and (max-width: 1000px) {
        font-size: 32px;
        position: relative;
        left: 7px;
    }
`;

const LeaderboardTable = styled.table`
    list-style-type: none;
    position: relative;
    left: 230px;
    @media screen and (max-width: 1200px) {
        position: relative;
        left: 180px;
    }
    @media screen and (max-width: 850px) {
        position: relative;
        left: 160px;
    }
    th {
        -webkit-columns: 2;
        -moz-columns: 2;
        columns: 2;
        -webkit-column-gap: 18em;
        -moz-column-gap: 18em;
        column-gap: 18em;
        font-weight: bolder;
        font-size: 20px;
        @media screen and (max-width: 1400px) {
            -webkit-column-gap: 16em;
            -moz-column-gap: 16em;
            column-gap: 16em;
        }
        @media screen and (max-width: 1300px) {
            -webkit-column-gap: 15em;
            -moz-column-gap: 15em;
            column-gap: 15em;
        }
        @media screen and (max-width: 1200px) {
            -webkit-column-gap: 12em;
            -moz-column-gap: 12em;
            column-gap: 12em;
        }
    }
    td {
        font-size: 24px;
        font-weight: bolder;
        color: pink;
        text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    }
    
`


const ButtonLine = styled.div`
    display: flex;
`

const ReturnHomeButton = styled.button`
    background-color: pink;
    color: black;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 18px;
    padding: 10px;
    margin: 5px;
    width: 150px;
    border-radius: 8px;
    box-sizing: border-box;
    border: solid 3px black;
    position: relative;
    top: 50px;
     
    @media screen and (max-width: 850px) {
        font-size: 14px;
        width: 120px;
    }
`;



class Leaderboard extends React.Component {

    state = {
        clickedReturn: false,
        list: [],
        formFields: {name:'', score:''},
        name:'',
        score:''
    }

    componentDidMount() {
        this.getList();
    }

    handleClickReturn () {
        this.setState({
          clickedReturn: true
        })
      }

    getList = () => {
        fetch('/api/scores')
        .then(res => res.json())
        .then(list => this.setState({ list }))
    }
    
    handleSubmit = (event) => {
        // Remove this and pop up score submitted modal screen?
        event.preventDefault();
        //(event.target)
        const data = {name: this.state.name, score: this.props.currentScore}
        
        fetch('http://localhost:5000/api/scores/post', {
            method: 'POST',
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
            body: JSON.stringify(data),

            //implement an auto redirect to home screen after letting them know (not through alert) score entry was submitted
            
        });
    }

    // handleSubmit(e){
    //     e.preventDefault();
        
    //     const userScore = {
    //         name : this.state.name,
    //         score: this.state.score
    //     };

    //     axios.post('localhost:5000/api/scores/post', userScore)
    //         .then(res => console.log(res.data))

    //     this.setState({
    //         name: '', 
    //         score:''
    //     })
    // }

    inputChangeHandler(e) {
        let formFields = {...this.state.formFields};
        formFields[e.target.name] = e.target.value;
        this.setState({
         formFields
        });
       }
    
       onChangeName(e) {
           this.setState({
               name: e.target.value
           });
       }

       onChangeScore(e) {
           this.setState({
               score: e.target.value
           });
       }
       
       renderContent1() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li><a href="/auth/google">Login With Google</a></li>
            default: 
                return <li><a href="/api/logout">Logout</a></li>
        }
    }

    renderContent2() {
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return;
            default: 
                return <PostScore/>

        }
    }
       formHandler(formFields) {
        axios.post('/api/scores/post', formFields)
          .then(function(response){
            console.log(response);
            //Perform action based on response
        })
          .catch(function(error){
            console.log(error);
            //Perform action based on error
          });
       }

    render() {

        const { list } = this.state;
        const { formFields } = this.state;
        const { name, score } = this.state;

        if (this.state.clickedReturn === false) {

        return(
            <StartGameBackground>
                <StyledStartGame>
                    <div className="LeaderboardWrapper">
                        <LeaderboardTitle>
                            Greatest Bingemasters
                        </LeaderboardTitle>
                        <LeaderboardTable>
                            {list.length ? (
                            <div>
                            {list.map((item) => {
                                return(
                                    <tr>
                                        <th>{item.name}</th>
                                        
                                        <th>{item.score}</th>
                                    </tr>
                                );
                            })}
                            </div>
                            ) : (
                                <div>
                                    <h2>You must be logged in to view the leaderboard</h2>
                                </div>
                            )
                            }
                        </LeaderboardTable>
                       
                       
                    <ButtonLine>
                        <ReturnHomeButton 
                            type="submit"
                            onClick={this.handleClickReturn.bind(this)}
                            >Return Home      
                        </ReturnHomeButton>
                       
                    </ButtonLine>
                    </div>
                </StyledStartGame>
            </StartGameBackground>
        )} else {
            return <HomePage/> 
}}

}
function mapStateToProps ({ auth }) {
    return { auth };
}
export default connect(mapStateToProps)(Leaderboard);