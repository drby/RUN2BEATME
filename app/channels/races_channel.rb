class RacesChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "race_#{params[:race_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
