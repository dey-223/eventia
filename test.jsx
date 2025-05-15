export default function AlertButton(message, children){
    return (
        <button onClick={ ()=> alert(message)}>{children}
        </button>
    
);
}
export default function App(){
    return(
        <div >
            <AlertButton className="Hello">Play Moovie !</AlertButton>
            <AlertButton message="Uploading!">
                Upload Image
            </AlertButton>
        </div>
    )
}


function Button({ onClick, children }) {
    return (
      <button onClick={onClick}>
        {children}
      </button>
    );
  }
  //Autre exemple de Button
  // avec une fonction de rappel pour le clic
  function PlayButton({ movieName }) {
    function handlePlayClick() {
      alert(`Playing ${movieName}!`);
    }
  
    return (
      <Button onClick={handlePlayClick}>
        Play "{movieName}"
      </Button>
    );
  }
  
  function UploadButton() {
    return (
      <Button onClick={() => alert('Uploading!')}>
        Upload Image
      </Button>
    );
  }
  
  export default function Toolbar() {
    return (
      <div>
        <PlayButton movieName="Kiki's Delivery Service" />
        <UploadButton />
      </div>
    );
  }
  
// Autre exemple de Button avec propagation d'événement
// en utilisant une fonction de rappel pour le clic
  function Button({ onClick, children }) {
    return (
      <button onClick={e => {
        e.stopPropagation();
        onClick();
      }}>
        {children}
      </button>
    );
  }
  
  export default function Toolbar() {
    return (
      <div className="Toolbar" onClick={() => {
        alert('You clicked on the toolbar!');
      }}>
        <Button onClick={() => alert('Playing!')}>
          Play Movie
        </Button>
        <Button onClick={() => alert('Uploading!')}>
          Upload Image
        </Button>
      </div>
    );
  }
  