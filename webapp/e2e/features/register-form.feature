Feature: Registering a new user

Scenario: The user does not have a solid pod
  Given A user without a pod
  When I click on the Get a Pod link
  Then I should be redirected to https://solidproject.org/users/get-a-pod in a new tab