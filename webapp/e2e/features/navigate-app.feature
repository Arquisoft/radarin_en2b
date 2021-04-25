Feature: Navigate webapp

Scenario: User with a pod logs in to radarin
  Given A user with a pod
  When I select my provider and log in with it
  Then I should see the main radarin page
