# TODO: Add Deactivate and Delete in AdminCustomers

## Backend Changes
- [x] Update admin model to add 'status' field (default 'active')
- [x] Update AllAdmins controller to include status in response
- [x] Add deactivateAdmin controller function
- [x] Add deleteAdmin controller function
- [x] Update userRoutes.js to add new routes: PUT /admins/:id/deactivate and DELETE /admins/:id

## Frontend Changes
- [x] Update AdminCustomers.jsx to display actual status instead of hardcoded "Active"
- [x] Add Actions column with Deactivate/Delete buttons
- [x] Add functions to handle deactivate and delete API calls
- [x] Refresh admin list after actions
- [x] Update mobile cards to include actions

## Testing
- [ ] Test deactivate functionality
- [ ] Test delete functionality
- [ ] Ensure proper error handling and authentication
