// A job that calculates how many tokens a donor gets. 
//
// Runs everyday to give a picture of the final airdrop.
// 
//
// The model is to uniformly distribute donations in such a way that "whales" can not dominate
// the distribution by making a single big donation.  To do this the size of a donation will be 
// sorted to determine the position in a list. This list is then divided up into consecutive bins 
// defined by the number of donations and not the size of the donation. 
// 
// By way of example ten donations 1,1,2,2,3,4,4,4,5,100 divided into five bins would result in 
// {1,1}, {2,2}, {3,4}, {4,4}, {5,100}
//  
// 
// Bins are then awarded tokens from lowest to highest, 
// 
//  1,1 five tokens each
//  2,2 ten tokens each
//  3,4 fifteen tokens each
//  4,4 twenty tokens each
//  5,100 twenty five tokens each
//
//  The 100 donation "whale" does not overwhelm the smaller donations. They get more but its game of diminishing returns.  
// 
//  If the "whale" wants to buy up they will have to do so on market. 
// 
// The underlying reasoning here is that I am holding a big pile of tokens intended to fund legal challenges. To do this I need to 
// create market demnand, a broad pool of on market buyers.
//
// It must be noted that there is some randomness where there are multiple donations of the same size will fall in different 
// bins, not ideal, but it is a raffle, its the luck of the draws.
//
// 
// 
// To stop being flooded with dust there is a minimum size donation. No firm idea yet, but in the order of a few $USD. 
// Enough to cover GAS consumed by the airdrop and to provide working capital. Perhaps the equivalent of $USD 5

// 
// Sort the donations by value from minimum to maximum. 
// 
// For each bin index, assign the index to those donations that belong in that bin.
//
// do some math, calculate the min, max and average donation in each bin put this into a summary table