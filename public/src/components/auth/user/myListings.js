import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../../../actions';
import { browserHistory } from 'react-router'
class MyListings extends Component {
  componentWillMount() {
    let listings = this.props.userInfo.myListings
    this.props.fetchMyListings(listings)
  }
  handleClick() {
    let clickResult = this._id;
    browserHistory.push(`/listings/${clickResult}`);
  }
  deleteClickHandle(e) {
    e.preventDefault();
    let clickResult = this[1]._id;
    let array = this[0].userInfo.myListings;
    let index = this[0].userInfo.myListings.indexOf(clickResult)
    array.splice(index, 1)
    this[0].removeListing(clickResult);
  }
  render() {
    let listings = this.props.mylistings || []
    if(listings) {
      return (
        <div>
          {listings && listings.length > 0 && <table className="table table-hover table-bordered">
            <thead>
              <tr>
                <th>Listing Name</th>
                <th>Country</th>
                <th>State</th>
                <th>City</th>
                <th>Address</th>
                <th>Price Per Night</th>
                <th>Rating</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {listings.map(function(result) {
                console.log(result)
                return (
                  <tr key={result._id} className='table-row'>
                    <td onClick={this.handleClick.bind(result)}>{result.title}</td>
                    <td onClick={this.handleClick.bind(result)}>{result.location.country}</td>
                    {result.location.country === 'united states' && <td onClick={this.handleClick.bind(result)}>{result.location.city}</td>}
                    {result.location.country !== 'united states' && <td onClick={this.handleClick.bind(result)}>X</td>}
                    {result.location.usCity !== 'not valid' && <td onClick={this.handleClick.bind(result)}>{result.location.usCity}</td>}
                    {result.location.usCity === 'not valid' && <td onClick={this.handleClick.bind(result)}>{result.location.city}</td>}
                    <td onClick={this.handleClick.bind(result)}>{result.location.address}</td>
                    <td onClick={this.handleClick.bind(result)}>${result.pricePerNight}</td>
                    <td onClick={this.handleClick.bind(result)}>rating</td>
                    <td onClick={this.deleteClickHandle.bind([this.props, result])}><button>X</button></td>
                  </tr>                )
              }.bind(this))}
            </tbody>
          </table>}
        </div>
      )
    } else {
      return <div>LOADING...</div>
    }

  }
}

function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, mylistings: state.listing.mylistings, userStuff: state.auth};
}
export default connect(mapStateToProps, actions)(MyListings);
