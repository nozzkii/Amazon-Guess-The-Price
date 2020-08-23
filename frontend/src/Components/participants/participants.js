import React, {Component} from 'react';

class Participants extends Component {
  constructor(props) {
     super(props);
     this.state = {
      participant: [],
      loading: true
    };
  }

async componentDidMount(){
    const url = "/api/participant";
    const response = await fetch(url);
    const data = await response.json();
    console.log(data[0]);
    console.log(data.map(data => data.length));
    this.setState({participant: data, loading:false});
  }

render(){
  return (
    <div>
    {this.state.loading ||  !this.state.participant ?(
      <div>loading ...</div>

    ):(
      /*Get Items from simple array
      <div>
      {this.state.participant.map((id, i ) =>

        <li>{i}</li>)}
      </div>*/
      //Get Key values of each element.
      <div>
           <div>
              <div>
                 {this.state.participant.map((dynamicComponent, i) => <Content
                    key = {i} componentData = {dynamicComponent}/>)}
              </div>
           </div>
      </div>
    )

    }
    </div>
  );

}
}

class Content extends React.Component {
   render() {
      return (
         <div>
            <div>#{this.props.componentData.id} {this.props.componentData.user}</div>
         </div>
      );
   }
}

export default Participants;
