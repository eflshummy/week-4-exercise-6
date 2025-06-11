//------------------------------------------------------------------------------------
// Part 1: Understanding Promises
//------------------------------------------------------------------------------------

// TODO: Create a Promise that simulates fetching user data
// - The Promise should resolve after 1.5 seconds
// - If userId is positive, resolve with user data object
// - If userId is negative or zero, reject with an error
// - User data should include: id, name, email, and registrationDate
let fetchUserData = function(userId){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(userId > 0){
                resolve({
                    id: userId,
                    name: `user${userId}`,
                    email: `user${userId}@gmail.com`,
                    registrationDate: new Date().toISOString()
                });
            } else{
                reject(new error('Invalid user ID: it must be a positive number'))
            }
        },1500)
    });
}

console.log(fetchUserData(5));


// TODO: Create a Promise that simulates fetching user posts
// - Should resolve after 1 second
// - Return an array of post objects
// - Each post should have: id, title, content, and userId
// - If userId doesn't exist, reject with error
let fetchUserPosts = (userId) => {
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            if(userId > 0){
                resolve([
                    {
                        id: 1,
                        title: 'Post Malone caught smuggling drugs',
                        content: 'lorem ipsum deo jeo poel ban out',
                        userId: userId
                    }, 
                        {
                        id: 2,
                        title: 'goku is the strongest',
                        content: 'lorem ipsum deo jeo poel ban out',
                        userId: userId
                    
                    }
                ]);
            } else {
                reject (new error('could not find user post'))
            }
        },1000);
    });
}


//------------------------------------------------------------------------------------
// Part 2: Promise Chaining
//------------------------------------------------------------------------------------

// TODO: Create a function that chains multiple Promises together
// - First fetch user data
// - Then fetch their posts
// - Combine the data into a single object
// - Handle any errors that occur in the chain
let getUserAndPost = (userId) => {
    return fetchUserData(userId)
        .then(user => {
            return fetchUserPosts(user.id)
                .then(post => {
                    return {user,post}
                })
        })
        .catch(e => {
            console.error('error in promise chain:', e.promise);
            return null;
        })
}
getUsersAndPosts(2);

//------------------------------------------------------------------------------------
// Part 3: Async/Await Implementation
//------------------------------------------------------------------------------------

// TODO: Convert the above Promise chain to use async/await
// - Use try/catch for error handling
// - Log each step of the process
// - Return combined user and posts data
async function getUserDataAsync(user){
    try{
        console.log('fetching user data for ID');
        let user = await fetchUserData(userId);
        console.log('user data received: ', user);

        console.log(`fetching posts for user ${userId}`);
        let posts = await fetchUserPosts(user.id);
        console.log(`posts received ${posts}`);

        return {user,posts}
    } catch (e){
        console.error(`error in async opeartion ${e.message}`);
        return null;
    }
}


//------------------------------------------------------------------------------------
// Part 4: Handling Multiple Async Operations
//------------------------------------------------------------------------------------

// TODO: Create a function that fetches multiple users in parallel
// - Take an array of userIds
// - Fetch all users simultaneously using Promise.all
// - Handle errors for individual user fetches
// - Return array of successfully fetched users
async function fetchMultipleUsers(userId){
    try{
        console.log('starting parallel user fetches');
        let promises = userIds.map(id => fetchUserData(id))
        let users = await promise.all(promises);
        console.log(`successfully fetched ${users.length} users`)
        return users;
    }catch (e) {
        console.error(`error in fetching multiple users: ${e.message}`);
        return [];
    }
}


// TODO: Create a function that fetches users and their posts in parallel
// - Fetch user data for multiple users
// - Once user data is received, fetch all their posts in parallel
// - Combine user and posts data
// - Handle errors appropriately
async function fetchUsersAndPosts(userIds){
    try{
        console.log('fetching users and posts');

        let users = await fetchMultipleUsers(userIds);

        let userPostPromises = users.map(user => 
            fetchUserPosts(user.id)
                .then(post => ({user,posts}))
                .catch(e => {
                    console.error(`error fetching posts user ${user.id}: ${e.message}`);
                    return {user,post: []};
                })
        );
    

        let usersWithPosts = await Promise.all(userPostPromise)
        return usersWithPosts;
    } catch(e){
        console.error (`error in fetchUseraAndPosts: ${e.message}`);
        return {...user,post: []};
    }
}



//------------------------------------------------------------------------------------
// Part 5: Testing Your Implementation
//------------------------------------------------------------------------------------

// TODO: Test success cases
// - Test single user fetch
// - Test multiple user fetch
// - Test error handling
try{

async function runTests(){

    //test 01: fetch single user 
    console.log(`test 01 fetching single user data`);
    let userData = await getUserDataAsync(1);
    console.log(`single user data: ${userData}`);

    // test 02 fetch multiple users
    console.log('test 02: fetching multiple users data');
    let multipleUser = await fetchMultipleUsers([1,2,3]);
    console.log(`multiple users result: ${multipleUser}`);

    //test 03 users with posts 
    console.log('test 03: fetching users with their posts');
    let fetchUsersWithPosts = await fetchUsersAndPosts([1,2]);
    console.log(`users with posts result: ${fetchUsersWithPosts}`);

    //test 04 error handling
    console.log('\n test 4: test error handling');
    let errorHandling = await getUserDataAsync(-1);
    console.log(`error occured: ${errorHandling}`);
}
} catch(e) {
    console.error(`test suite error: ${e.message}`);
}

runTests()


// Run the tests