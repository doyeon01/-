export interface TravelPlan {
    title: string;
    startDate: Date;
    endDate: Date;
    dayPlans: DayPlan[];
  }
  
export interface DayPlan {
day: number;
plans: Plan[];
}
  
type Plan = FeedPlan | PlacePlan;
  
interface FeedPlan {
    type: "feed";
    userId: number;
    placeName: string;
    title: string;
    content: string;
    imageUrl: string;
    address1: string;
    address2: string;
    longitude: number;
    latitude: number;
    placeType: string;
    details: string;
  }
  
interface PlacePlan {
    type: "place";
    placeName: string;
    roadAddressName: string;
    addressName: string;
    placeType: string;
    x: number;
    y: number;
    details: string;
  }