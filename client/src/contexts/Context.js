import { createContext } from "react";

const schedule = {
  events: [
    {
      title: 'Title',
      participants: ['Name'],
      urls: ['url'],
      date: 'Date',
      type: 'game|karaoke|zatsu...',
      tags: ['tag0', 'tag1'],
      source: 'source'
    }
  ],
}

export const Context = createContext()

/**
 *  App
 *    Router
 *      DetailsPage
 *      MainPage
 *        Filter
 *        Week - filtered schedule
 *          Day - events[] for the current day
 *            Card - any event: vtuber, title, link, etc...
 *              
 *  Card
 *    Header
 *      Avatar
 *      Name
 *      Time
 *    Details
 *      Title
 *        Link
 *      Source
 *      
 *      
 */