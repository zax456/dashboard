import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';
import Dashboard from '../../views/Dashboard/';
import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Components
import Buttons from '../../views/Components/Buttons/';
import Cards from '../../views/Components/Cards/';
import Forms from '../../views/Components/Forms/';
import Modals from '../../views/Components/Modals/';
import SocialButtons from '../../views/Components/SocialButtons/';
import Switches from '../../views/Components/Switches/';
import Tables from '../../views/Components/Tables/';
import Tabs from '../../views/Components/Tabs/';

// Icons
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';
import * as firebase from 'firebase';

// Initialize Firebase
// TODO: Replace with your project's customized code snippet

var config = {
  apiKey: "AIzaSyBtMRr70s5oHD8FIpzEwfXw4-pXKuLIZaU",
  authDomain: "bt3103-dashboard.firebaseapp.com",
  databaseURL: "https://bt3103-dashboard.firebaseio.com",
  projectId: "bt3103-dashboard",
  storageBucket: "bt3103-dashboard.appspot.com",
  messagingSenderId: "850800858568"
};
firebase.initializeApp(config);


class Full extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let db = firebase.database().ref('/');    
    db.off();
    db.on('value', snapshot => {
      /* Update React state when message is added at Firebase Database */
      
      let locData = snapshot.val();
      this.setState(locData);
      console.log(locData);
      this.forceUpdate();
      //this.state = locData;
    })
  }

  render() {
    return (
      <div className="app">
        <Header />
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb />
            <Container fluid>
              <Switch>
                <Route path="/charts" name="Charts" children={props => <Charts local_data={this.state} {...props} />} />
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                // <Route path="/dashboard" name="Dashboard" render={props => <Charts local_data={this.state} {...props} />} />
                <Route path="/components/buttons" name="Buttons" component={Buttons}/>
                <Route path="/components/cards" name="Cards" component={Cards}/>
                <Route path="/components/forms" name="Forms" component={Forms}/>
                <Route path="/components/modals" name="Modals" component={Modals}/>
                <Route path="/components/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/components/switches" name="Swithces" component={Switches}/>
                <Route path="/components/tables" name="Tables" component={Tables}/>
                <Route path="/components/tabs" name="Tabs" component={Tabs}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts_original" name="Charts" component={Charts} />
                
                
                <Redirect from="/" to="/dashboard"/>
            </Switch>
            </Container>
          </main>
          <Aside />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Full;
