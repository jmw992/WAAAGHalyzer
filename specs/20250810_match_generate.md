I want to create a demo page which can create batches of RecordedMatch and add them to the DB.  I want to be able to select an option "Match        
Generate" in the demo dropdown.  When selecting that, it will take the user to a page where they can configure the data to be batched.  The user    
should be able to set the size of the batch data.  They should be able to customize the behavior of each of the fields of RecordedMatch, so that the
field will either be the randomly set value through a library like Faker.js or random selection of value from an array.  There should be a submit   
button which then will add those generated matches to the DB, with the submit button using react-query so the query key ["matches"] gets updated.   
This way the History page will be up to date with the generated data.    p