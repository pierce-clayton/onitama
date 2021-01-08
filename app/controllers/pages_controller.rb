class PagesController < ApplicationController
  def index
  end

  def not_found
    @pack = "public"
    respond_to do |format|
      format.html { render status: 404 }
    end
  end
end
