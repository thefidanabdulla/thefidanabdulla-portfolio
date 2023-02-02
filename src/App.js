import {BsGithub, BsFacebook, BsLinkedin}  from 'react-icons/bs';
 

function App() {
  return (
    <div className="container">
      <p>Fidan Abdulla</p>
      <h1>thefidanabdulla</h1>
      <div className="links">
        <a href='https://www.github.com/thefidanabdulla' className="linkItem">
          <BsGithub />
        </a>
        <a href='https://www.facebook.com/fidan.abdulla.1/' className="linkItem">
          <BsFacebook />
        </a>
        <a href='https://www.linkedin.com/in/thefidanabdulla/' className="linkItem">
          <BsLinkedin />
        </a>
      </div>      
    </div>
  );
}

export default App;
