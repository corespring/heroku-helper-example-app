#!/usr/bin/env ruby
require 'json'

puts "-------------------------------------"
puts "common/push/before/run.sh"
puts "running db migrations"
puts "-------------------------------------"

config = JSON.parse(IO.read(ARGV[0]))

JAR="deployment/libs/mongo-migrator-0.1.one-jar.jar"
MIGRATIONS="deployment/db/migrations"
MONGO_URI = config["ENV_MONGO_URI"]
COMMIT_HASH = `git rev-parse --short HEAD`.chomp

cmd = "java -jar #{JAR} migrate #{COMMIT_HASH} #{MONGO_URI} #{MIGRATIONS}"
puts "command: "
puts "#{cmd}"