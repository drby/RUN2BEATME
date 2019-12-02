puts "Destroy everything"
User.destroy_all
Run.destroy_all
Race.destroy_all
Challenge.destroy_all
puts "Finished"


puts "Creating 4 Users..."
 User.create(username: 'tom_y', email: 'tom.drby@gmail.com', password: 'azerty', wallet: 100, photo: "tom.jpg")
 User.create(username: 'mick_ado', email: 'mick.a@gmail.com', password: 'azerty', wallet: 200, photo: "mika.jpg")
 User.create(username: 'yann_os', email: 'yann.os@gmail.com', password: 'azerty', wallet: 150, photo: "yann.jpg")


puts "Creating 10 Challenges ..."
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

puts "Finished"
