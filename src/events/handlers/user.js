function handleUserCreate(user) {
  console.log("user create handled ", user);
  // TODO: Initialize user profile, use defaults (createOrUpdate)
  // For now we gonna use createOr Update and later will use cache sysetm for fast retrieve regisred active users
  //Eg use: when first time user interact with the bot
}

function handleUserUpdate(user) {
  // TODO: Apply updates to user preferences or settings (such as timezone)
}

module.exports = {
  handleUserCreate,
  handleUserUpdate,
};
