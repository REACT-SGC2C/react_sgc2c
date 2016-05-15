const React = require('react');
const ReactDOM = require('react-dom');

var GetCelebs = React.createClass({
  getInitialState: function() {
    this.displayCelebs();
    return {
      celebs: []
    };
  },

  editCeleb: function(id) {
    return () => {
      var holder = this.state.celebs.map(function(celeb) {
        if (id === celeb._id) celeb.editing = true;
        return celeb;
      });
      this.setState({
        celebs: holder
      });
    };
  },

  removeCeleb: function(id) {
    return () => {
      var holder = this.state.celebs.filter(function(celeb) {
        if (celeb._id === id) return false;
        return true;
      });
      this.setState({
        celebs: holder
      });

      $.ajax({
        url: 'http://localhost:3000/api/celebs/' + id,
        type: 'DELETE'
      }).then(function(data) {
        console.log(data);
      });
    };
  },

  saveCeleb: function(event) {
    event.preventDefault();
    var celebData = {
      name: event.target.children['celeb-name'].value,
      occupation: event.target.children['celeb-occupation'].value,
      species: event.target.children['celeb-species'].value
    };

    $.ajax({
      url: 'http://localhost:3000/api/celebs/' + event.target.id,
      type: 'PUT',
      data: celebData
    }).then(function(data) {
      console.log(data);
    }, function(err) {
      console.log(err);
    });

    var holder = this.state.celebs.map(function(celeb) {
      if (celeb._id === event.target.id) {
        celeb.name = celebData.name;
        celeb.occupation = celebData.occupation;
        celeb.species = celebData.species;
        celeb.editing = false;
      }
      return celeb;
    });
    this.setState({
      celebs: holder
    });
  },

  displayCelebs: function() {
    $.ajax({
      url: 'http://localhost:3000/api/celebs',
      type: 'GET'
    }).then((data) => {
      data.forEach(function(celeb) {
        celeb.editing = false;
      });
      this.setState({
        celebs: data
      });
    });
  },

  render: function() {
    return (
       <ol>
        { this.state.celebs.map((celeb) => {
          return (
          <li key = { celeb._id } >
            <p>Name: { celeb.name },</p>
            <p>Occupation: { celeb.occupation }</p>
            <p>Species: { celeb.species }</p>
              <p><button onClick = { this.editCeleb(celeb._id) } > EDIT < /button>
              <button onClick = { this.removeCeleb(celeb._id) } > DELETE < /button></p>

              <form id = { celeb._id } className = { celeb.editing ? null : 'hidden' } onSubmit = { this.saveCeleb }>
                <input type = "text" name = "celeb-name" placeholder = "Celeb Name" defaultValue = { celeb.name } />
                <input type = "text" name = "celeb-occupation" placeholder = "Occupation" defaultValue = { celeb.occupation } />
                <input type = "text" name = "celeb-species" placeholder = "Species" defaultValue = { celeb.species } />
                <button type = "submit">SAVE INTERVIEW</button>
              </form>
            </li>
          );
        })}
      </ol>
    );
  }
});

var NewCeleb = React.createClass({
  createCeleb: function(event) {
    event.preventDefault();

    var celebData = {
      name: event.target.children['celeb-name'].value,
      occupation: event.target.children['celeb-occupation'].value,
      species: event.target.children['celeb-species'].value
    };

    $.post('http://localhost:3000/api/celebs', celebData, function(data) {
      console.log(data);
      document.location.reload(true);
    });
  },

  render: function() {
    return (
      <form onSubmit={this.createCeleb}>
        <input type="text" name="celeb-name" placeholder="Celeb Name" />
        <input type="text" name="celeb-occupation" placeholder="Occupation" />
        <input type="text" name="celeb-species" placeholder="Species" />
        <button type="submit">CREATE INTERVIEW</button>
      </form>
    );
  }
});

ReactDOM.render( < GetCelebs /> , document.getElementById('celeb-holder'));
ReactDOM.render( < NewCeleb /> , document.getElementById('newceleb'));
