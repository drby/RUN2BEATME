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


puts "Create Challenge with Faker"
20.times do
  Challenge.create(category: 0, distance: [1000,2000,5000,10000].sample, bet: [2,5,10,20,50,100].sample)
end

