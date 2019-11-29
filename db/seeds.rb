require 'faker'
puts "Destroy everything"
User.destroy_all
Run.destroy_all
Race.destroy_all
Challenge.destroy_all
puts "Finished"


puts "Create Users with Faker"
 User.create(username: 'Tomy', email: 'tomy@gmail.com', password: 'azerty', wallet: 100)
20.times do
  User.create(username: Faker::Internet.username, email: Faker::Internet.email, password: 'azerty', wallet: rand(0..100))
end


puts "Create Challenge"
  Challenge.create(category: 0, distance: 500, bet: 5)
  Challenge.create(category: 0, distance: 500, bet: 10)
  Challenge.create(category: 0, distance: 700, bet: 10)
  Challenge.create(category: 0, distance: 700, bet: 20)
  Challenge.create(category: 0, distance: 800, bet: 30)
  Challenge.create(category: 0, distance: 800, bet: 40)
  Challenge.create(category: 0, distance: 1000, bet: 30)
  Challenge.create(category: 0, distance: 1000, bet: 40)
  Challenge.create(category: 0, distance: 1000, bet: 50)
  Challenge.create(category: 0, distance: 2200, bet: 100)
