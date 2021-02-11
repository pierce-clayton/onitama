class PagesController < ApplicationController
  
  def index
    respond_to do |format|
      format.html { render 'pages/index'}
      format.png { render file: '../assets/images/out-bw-fade.png' }
    end
    
  end

  def not_found
    @pack = "public"
    respond_to do |format|
      format.html { render status: 404 }
    end
  end
end
