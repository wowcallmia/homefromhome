import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Listings from './listings/listings';
import {Link} from 'react-router';

//WELCOMING PAGE
class Listings_Container extends Component {
  componentWillMount() {
    this.props.fetchInfo();
    this.props.fetchListings();
  }
  render() {
    let {listings, userInfo} = this.props;
    if(listings) {
      return (
        <div>
          <h3>Listings</h3>
          <Link to="/new">New Listing</Link>
          <div className='row'>
            <Listings />
          </div>
        </div>
      );
    }
    return (
      <div><img src="http://bestanimations.com/Science/Gears/loadinggears/loading-gears-animation-3.gif"></img> </div>
    );
  };
}
function mapStateToProps(state) {
  return {userInfo: state.auth.userInfo, listings: state.listing.listings};
}
export default connect(mapStateToProps, actions)(Listings_Container);
