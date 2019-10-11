import React, { Component } from 'react';
import { Container, Header, Content, Button, Text, Card, CardItem } from 'native-base';
export default class Coba extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Button>
            <Text>Click Me!</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
// export default class Coba extends Component {
//     render() {
//       return (
//         <Container>
//           <Content>
//               <Card>
//                   <CardItem>
//                       <Button>
//                           <Text>Click Me!</Text>
//                       </Button>
//                   </CardItem>
//               </Card>
//           </Content>
//         </Container>
//       );
//     }
// }