import React from 'react';
import { Card, Icon } from 'semantic-ui-react';


const studentCard = ({ student }) => (
  <Card>
    <Card.Content>
      <Card.Header>{student.firstName} {student.lastName}</Card.Header>
      <Card.Meta>
        <span className='date'>{student.dateJoined}</span>
      </Card.Meta>
      <Card.Description>
        {student.email}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name={student.status} />
        {student.status}
      </a>
    </Card.Content>
  </Card>
);

export default studentCard;