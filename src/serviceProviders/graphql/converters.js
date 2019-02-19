export const toPal = gqlPal =>
  gqlPal && {
    id: gqlPal.id, // the Id of the pal
    userId: gqlPal.user && gqlPal.user.id,
    activity: gqlPal.activity,
    // the date the pal is planning on to do the activity
    date: gqlPal.date && {
      startDate: new Date(Number(gqlPal.date.startDate)),
      endDate: new Date(Number(gqlPal.date.endDate))
    },
    interested: gqlPal.interested,
    user: gqlPal.user,
    location: gqlPal.location,
    liked: false // assumption: gql api will not return the items that are laready liked by user. so liked is set to false.
  };

export const toEvent = gqlEvent =>
  gqlEvent && {
    id: gqlEvent.id, // the Id of the pal
    activity: gqlEvent.activity,
    //the date the pal is planning on to do the activity
    date: gqlEvent.date && {
      startDate: new Date(Number(gqlEvent.date.startDate)),
      endDate: new Date(Number(gqlEvent.date.endDate))
    },
    image: gqlEvent.image //Url to the pals image
  };

export const toUser = gqlUser =>
  gqlUser && {
    id: gqlUser.id,
    name: gqlUser.name && {
      first: gqlUser.name.first,
      last: gqlUser.name.last
    },
    gender: gqlUser.gender,
    registrationDate: new Date(Number(gqlUser.registrationDate)),
    dob: new Date(Number(gqlUser.dob)),
    email: gqlUser.email,
    cell: gqlUser.cell,
    location: gqlUser.location && {
      city: gqlUser.city,
      state: gqlUser.state,
      coordinates: gqlUser.coordinates && {
        latitude: gqlUser.coordinates.latitude,
        longitude: gqlUser.coordinates.longitude
      }
    },
    picture: gqlUser.picture && {
      large: gqlUser.picture.large,
      medium: gqlUser.picture.medium,
      thumbnail: gqlUser.picture.thumbnail
    }
  };
