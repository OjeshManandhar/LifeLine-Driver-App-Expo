// packages
import { getDistance } from 'geolib';
import { point } from '@turf/helpers';
const mbxGeocoder = require('@mapbox/mapbox-sdk/services/geocoding');

// utils
import UserLocation from 'utils/userLocation';
import getRouteDistance from 'utils/getRouteDistance';

// env
import { MAPBOX_API_KEY } from '@env';

const geocodingClient = mbxGeocoder({ accessToken: MAPBOX_API_KEY });

function parseResponse(match) {
  return new Promise((resolve, reject) => {
    const locations = [];
    const distancePromiseList = [];
    const features = match.features;
    const distancePromiseListId = [];

    const startLocation = UserLocation.currentLocation;

    for (let key in features) {
      const data = point(features[key].center, {
        id: features[key].id,
        name: features[key].text,
        type: features[key].place_type[0],
        location: features[key].place_name
      });

      const distance = getDistance(
        { latitude: startLocation[1], longitude: startLocation[0] },
        {
          latitude: data.geometry.coordinates[1],
          longitude: data.geometry.coordinates[0]
        },
        10
      );

      // Only store data of location within 500km
      if (distance <= 500 * 1000) {
        locations.push(data);

        // Only find route if the location is within 50km
        if (distance <= 50 * 1000) {
          distancePromiseList.push(
            getRouteDistance(startLocation, features[key])
          );
          distancePromiseListId.push(data.properties.id);
        }
      }
    }

    Promise.all(distancePromiseList).then(values => {
      for (let i = 0; i < values.length; i++) {
        for (let j = 0; j < locations.length; j++) {
          if (locations[j].properties.id === distancePromiseListId[i]) {
            locations[j].properties.distance = parseFloat(values[i]).toFixed(2);
          }
        }
      }

      locations.sort((locationA, locationB) => {
        const locA = locationA.properties.distance;
        const locB = locationB.properties.distance;

        if (!locA && !locB) {
          return 0;
        } else if (!locA) {
          // locB smaller than locA(undefined)
          return 1;
        } else if (!locB) {
          // locA smaller than locB(undefined)
          return -1;
        } else {
          return locA - locB;
        }
      });

      // console.log('Locations:', locations);

      resolve(locations);
    });
  });
}

function forwardGeocoder(keyword) {
  return new Promise((resolve, reject) => {
    geocodingClient
      .forwardGeocode({
        query: keyword,
        countries: ['np'],
        limit: 10,
        autocomplete: true
        // types: [
        //   'poi',
        //   'place',
        //   'region',
        //   'address',
        //   'district',
        //   'locality',
        //   'poi.landmark',
        //   'neighborhood'
        // ]
      })
      .send()
      .then(
        async response => {
          const match = response.body;

          resolve(await parseResponse(match));
        },
        error => {
          console.log('forwardGeocoder error:', error);
          // if (err.type === 'RequestAbortedError') {
          //   console.log('Request Aborted');
          //   return;
          // }
          // console.error(error.message);

          // const match = error.body;
          reject(error);
        }
      );
  });
}

export default forwardGeocoder;
