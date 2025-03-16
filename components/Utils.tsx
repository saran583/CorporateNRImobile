import moment from "moment"

export function filterPosts (posts){
    let res = posts.map((post)=>{
          if(post.category_id==1){
            return {
              id: post.id,
              title: post.title,
              price: post.listing_category === "Sale"? "$"+post.sale_price : "$"+post.monthly_rent,
              location: post.location,
              postedBy: post.first_name+" "+post.last_name,
              amenities: post.amenities.split(","),
              createdAt: post.created_date,
              images: post.image_url.split(","),
              listingCategory: post.listing_category,
              category: post.category_id
            }
          }
          else if(post.category_id==2){
            const utilities = JSON.parse(post.utility_items)
            return {
              id: post.id,
              title: post.listing_category+" Items for Sale",
              price:  moment(post.available_from).format("YYYY/MM/DD"),
              location: post.location,
              postedBy: post.first_name+" "+post.last_name,
              amenities: utilities.map(item => item.name),
              createdAt: post.created_date,
              images: post.image_url.split(","),
              listingCategory: post.listing_category,
              category: post.category_id
            }
          }
          else if(post.category_id==3){
            return {
              id: post.id,
              title: post.title,
              price: post.listing_category,
              location: moment(post.key_date).format("YYYY/MM/DD"),
              postedBy: post.first_name+" "+post.last_name,
              amenities: [post.details],
              createdAt: post.created_date,
              images: post.image_url.split(","),
              listingCategory: post.listing_category,
              category: post.category_id
    
            }
          }
        
        })

    return res;
}

export function getDetails(post){
  if(post.category_id==1 && post.listing_category=="Sale"){
    return {
      Category: post.listing_category,
      Price: "$"+post.sale_price,
      Advance:post.advance,
      Pincode: post.pincode,
      Bedrooms:post.bedrooms,
      Bathrooms:post.bathrooms,
      Size:post.square_feet,
      Deposit:post.deposit,
      "Available From": moment(post.available_from).format("YYYY/MM/DD"),
      "Pets Allowed": post.pets_allowed==1?"Yes":"No",
      "Smoking Allowed": post.smoking_allowed==1?"Yes":"No",
      "Parking Available":post.is_parking_available==1?"Yes":"No",
      "Nearby Groceries":post.nearby_groceries,
      "Bus Connectivity":post.bus_connectivity,
      "Additional Details":post.additional_detail
    }
  }
  else if(post.category_id==1 && post.listing_category=="Rent"){
    return {
      Category: post.listing_category,
      Price: "$"+post.monthly_rent+"/monthly",
      Pincode: post.pincode,
      Bedrooms:post.bedrooms,
      Bathrooms:post.bathrooms,
      Size:post.square_feet,
      Deposit:post.deposit,
      "Rental Duration": post.rental_duration,
      "Rental Type": post.rental_type,
      "Available From": moment(post.available_from).format("YYYY/MM/DD"),
      "Food Preference": post.food_preference,
      "Preferred Gender": post.preferred_gender,
      "Pets Allowed": post.pets_allowed==1?"Yes":"No",
      "Smoking Allowed": post.smoking_allowed==1?"Yes":"No",
      "Parking Available":post.is_parking_available==1?"Yes":"No",
      "Nearby Groceries":post.nearby_groceries,
      "Bus Connectivity":post.bus_connectivity,
      "Additional Details":post.additional_detail
    }
  }
  else if(post.category_id==2){
    return {
      Category: post.listing_category,
      Location: post.location,
      "Available From": moment(post.available_from).format("YYYY/MM/DD"),
      "Available To": moment(post.available_to).format("YYYY/MM/DD"),
      "Additional Details": post.additional_detail,
    }
  }
  else if(post.category_id==3){
    return {
      Category: post.listing_category,
      "Key Date": moment(post.key_date).format("YYYY/MM/DD"),
      Details: post.details,
      "Additional Details": post.additional_information
    }

  }
}

export const formatTimestamp = (timestamp) => {
    const now = moment();
    const time = moment(timestamp);
  
    const diffMinutes = now.diff(time, "minutes");
    const diffHours = now.diff(time, "hours");
    const diffDays = now.diff(time, "days");
  
    if (diffMinutes < 60) {
      return `${diffMinutes} minutes ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hours ago`;
    } else {
      return time.format("YYYY-MM-DD"); // Show date if more than a day old
    }
  };

