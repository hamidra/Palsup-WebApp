const Events = () => [
  {
    id: '1', //'a UUID for the event'
    description: 'Swimming in the Greenlake',
    //the activity that pal is down for
    activity: {
      type: 'Swimming',
      // the locatin that pal is planning to the activity
      activityLocation: {
        city: 'seattle',
        state: 'WA',
        coordinates: {
          latitude: '47.605583',
          longitude: '-122.334114',
          raidus: '10'
        }
      }
    },
    //the date the pal is planning on to do the activity
    date: {
      startDate: '2019-04-23T18:25:43.511Z',
      endDate: '2019-04-29T18:25:43.511Z'
    },
    topAttendees: [
      {
        userId: '1', // the userId of the user
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/60.jpg'
      },
      {
        userId: '2', // the userId of the user
        thumbnail: 'https://randomuser.me/api/portraits/thumb/men/61.jpg'
      }
    ], //An array of the users who are attending/interested
    image: 'https://via.placeholder.com/150/0000FF/' //'url to the events image'
  } /*,
  {
    id: '2', //'an UUID for the event'
    activity: 'Running', //'This is the type of activity that is planned for this event.'
    date: '2012-04-23T18:25:43.511Z',
    attendees: [{}], //An array of the users who are attending/interested
    image: 'https://via.placeholder.com/150/FF0000/' //'url to the events image',
  },
  {
    id: '3', //'an UUID for the event'
    activity: 'Coffee', //'This is the type of activity that is planned for this event.'
    date: '2012-04-23T18:25:43.511Z',
    attendees: [{}], //An array of the users who are attending/interested
    image: 'https://via.placeholder.com/150/00FF00/' //'url to the events image',
  },
  {
    id: '4', //'an UUID for the event'
    activity: 'Party', //'This is the type of activity that is planned for this event.'
    date: '2012-04-23T18:25:43.511Z',
    attendees: [{}], //An array of the users who are attending/interested
    image: 'https://via.placeholder.com/150/FFFF00/' //'url to the events image',
  }*/
];

export default Events;
