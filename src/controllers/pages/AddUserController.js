/*
* ------------------------------
*        ADD USER PAGE
* ------------------------------
*/

export const addUserPage = async (req, res) => {
   const data = {
       user: req.user,
   };
   res.render('add-user', data);
};