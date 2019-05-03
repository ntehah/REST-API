import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class MembreList extends Component {

  constructor(props) {
    super(props);
    this.state = {membres: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

    fetch('/membre')
      .then(response => response.json())
      .then(data => this.setState({membres: data, isLoading: false}));
  }

  async remove(id) {
    await fetch(`/membre/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
      let updatedMembres = [...this.state.membres].filter(i => i.id !== id);
      this.setState({groups: updatedMembres});
    });
  }

  render() {
    const {membres, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

    const MembreList = membres.map(membre => {
      //const address = `${group.address || ''} ${group.city || ''} ${group.stateOrProvince || ''}`;
      return <tr key={membre.id}>
        <td style={{whiteSpace: 'nowrap'}}>{membre.nom}</td>
        <td style={{whiteSpace: 'nowrap'}}>{membre.prenom}</td>
        <td style={{whiteSpace: 'nowrap'}}>{membre.adresse}</td>
        <td style={{whiteSpace: 'nowrap'}}>{membre.email}</td>
        <td style={{whiteSpace: 'nowrap'}}>{membre.genre}</td>
        
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/membre/" + membre.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(membre.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/new">Add Group</Button>
          </div>
          <h3>My JUG Tour</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Location</th>
              <th>Events</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {MembreList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default MembreList;