import React, { Component } from 'react'
import styled from 'styled-components';
import avatar from '../img/avatarPlaceholder.jpg';
import axios from 'axios';
import { getToken } from '../tokenService';

const StyledContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 height: auto;
 margin-bottom-20px;
`;

const StyledForm = styled.form`
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px; /* Расстояние между элементами формы */
    border: 3px solid black;
    padding: 20px;
    border-top-left-radius: 11px;
    border-top-right-radius: 11px;
    width: 100%; /* Ширина формы */
    height: 800px;
    box-sizing: border-box;
    justify-content: flex-end;
    margin: 20px 0px 0px 20px;
`; 

const StyledImg = styled.img` 
  top: 10px;
  left: 10px;
  width: 100px;
  height: 100px;
`;

const StyledMainInfoContainer = styled.div`
position: absolute;  
top: 20px;
width: 80%;
right: 0px;
`;

const StyledOtherInfoContainer = styled.div`
position: absolute;  
top: 110px;
width: 100%;
`;

const StyledP = styled.p`
width: 95%;
text-align: left;
margin: 10px 20px 10px 20px;
white-space: normal;
`;

const StyledButton = styled.button`
  background-color: white;
  color: black;
  border: 3px solid black; // Убираем стандартные границы
  border-top: none; 
  outline: none; // Убираем стандартный контур при фокусе
  box-shadow: none;
  width: 100%;
  height: 40px;
  border-bottom-left-radius: 11px;
  border-bottom-right-radius: 11px;
  &:hover {
      cursor: pointer;
      color: white;
      background-color: black;
  }
`;

const StyledButtonContainer = styled.div`
  margin-left: 20px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center; // Выравнивание элементов по центру по вертикали
`;

const StyledInput = styled.input.attrs({
  maxLength: 50,
})`
    background-color: white;
    border: 1px solid black;
    border-radius: 5px;
    padding: 10px;
    width: 90%;
    height: 35px;
    box-sizing: border-box;
    margin-left: 20px;
    margin-top: 5px;
`;

const StyledTextarea = styled.textarea.attrs({
  maxLength: 200,
})`
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  height: 180px;
  margin-left: 20px;
  box-sizing: border-box;
  resize: none; 
  overflow: hidden;
`;

// var token;
// var userId;

// axios.get('http://127.0.0.1:5000/get_user_id', {
//   headers: {
//       'Authorization': `Bearer ${token}`
//   }
// })
// .then(response => {
//   console.log(response.data.user_id);
//   userId = response.data.user_id;
// })
// .catch(error => {
//   console.error('Error:', error);
// });

export default class profilePlateEditor extends Component {
  constructor(props){
    super(props)
    this.state ={
      firstName: this.props.thisFrame.firstName,
      lastName: this.props.thisFrame.lastName,
      fatherName: this.props.thisFrame.fatherName,
      institute: this.props.thisFrame.institute,
      studyDirection: this.props.thisFrame.studyDirection,
      course: this.props.thisFrame.course,
      skillLevel: this.props.thisFrame.skillLevel,
      profession: this.props.thisFrame.profession,
      searchAim: this.props.thisFrame.searchAim,
      about: this.props.thisFrame.about,
      teamSearchState: this.props.thisFrame.teamSearchState
    }
  }
  render() {
    return (
        <StyledContainer>
          <StyledForm>
              <StyledImg className="Avatar" src={avatar} width={90}/>
              <StyledMainInfoContainer>
                <StyledInput value={this.state.lastName} style={{width: "40%", height: "30px"}} onChange={(e) => {this.setState({lastName: e.target.value})}}></StyledInput>
                <StyledInput value={this.state.firstName} style={{width: "40%", height: "30px"}} onChange={(e) => {this.setState({firstName: e.target.value})}}></StyledInput>
                <ul>
                    <li className = "Direction">
                      <StyledInput value={this.state.profession} onChange={(e) => this.setState({profession: e.target.value})}></StyledInput>
                    </li>
                    <li className="Search">
                      <input 
                        type="checkbox" 
                        checked={this.state.teamSearchState} 
                        onChange={(e) => this.setState({teamSearchState: e.target.checked})}
                      />
                      В поисках команды
                    </li>
                </ul>
              </StyledMainInfoContainer>
              <StyledOtherInfoContainer>
                <StyledInput value={this.state.institute} onChange={(e) => this.setState({institute: e.target.value})}></StyledInput>
                <StyledInput value={this.state.studyDirection} onChange={(e) => this.setState({studyDirection: e.target.value})}></StyledInput>
                <StyledInput value={this.state.course} onChange={(e) => this.setState({course: e.target.value})}></StyledInput>
                <StyledInput value={this.state.skillLevel} onChange={(e) => this.setState({skillLevel: e.target.value})}></StyledInput>
                <StyledInput value={this.state.searchAim} onChange={(e) => this.setState({searchAim: e.target.value})}></StyledInput>
                <StyledP>О себе</StyledP>
                <StyledTextarea value={this.state.about} onChange={(e) => this.setState({about: e.target.value})}></StyledTextarea>
                <StyledP>Что хочу от команды</StyledP>
                <StyledTextarea value={'Хочу быть частью динамичной и технологичной продвинутой команды для создания действительно проработанной визуальной новеллы.'}
                  style={{height: "110px"}}></StyledTextarea>
              </StyledOtherInfoContainer>
          </StyledForm>
          <StyledButtonContainer>
            <StyledButton onClick={() => {
              const token = getToken();
              if (token) {
                axios.patch('http://127.0.0.1:5000/update_user', {
                    "firstName": this.state.firstName,
                    "lastName": this.state.lastName,
                    "fatherName": this.state.fatherName,
                    "institute": this.state.institute,
                    "studyDirection": this.state.studyDirection,
                    "course": this.state.course,
                    "skillLevel": this.state.skillLevel,
                    "profession": this.state.profession,
                    "searchAim": this.state.searchAim,
                    "about": this.state.about,
                    "teamSearchState": this.state.teamSearchState
                  }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log(response.data);
                    this.props.makeEditing();
                    this.props.onUpdateUsers();
                    console.log("123po")
                })
                .catch(error => {
                    console.error('Error:', error);
                });
            }}}>сохранить</StyledButton>
          </StyledButtonContainer>
        </StyledContainer>
    )
  }
}