class UsersController < ApplicationController
  before_action :set_user, only: %i[show edit update destroy stats]

  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def edit
    render json: @user, except: %i[password_digest created_at updated_at]
  end

  # POST /users
  # POST /users.json
  # def create
  #   @user = User.find_or_create_by(user_params)

  #   if @user.save
  #     # ActionCable.server.broadcast('GameChannel', @user)
  #     render json: @user
  #   else
  #     render json: @user.error, status: :unprocessable_entity
  #   end
  # end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if not @user.authenticate(params["password"])
      render json: { :ok => false }, status: 401
      return
    end
    @user.update({
      "user_name" => params[:user_name],
      "password" => params[:newPassword],
    })
    render json: @user
    # respond_to do |format|
    #   if @user.update(user_params)
    #     format.html { redirect_to @user, notice: "User was successfully updated." }
    #     format.json { render :show, status: :ok, location: @user }
    #   else
    #     format.html { render :edit }
    #     format.json { render json: @user.errors, status: :unprocessable_entity }
    #   end
    # end
  end

  def destroy
    @user.destroy
    render json: @user
    # @user.destroy
    # respond_to do |format|
    #   format.html { redirect_to users_url, notice: "User was successfully destroyed." }
    #   format.json { head :no_content }
    # end
  end

  def stats
    puts "<>" * 30
    puts @user
    rank = 0
    ranks = User.all.map do |user|
      if user.games.length == 0
        0
      else
        (Game.where(winning_user_id: user.id).length).to_f / (user.games.length).to_f
      end
    end

    ranks = ranks.sort.reverse
    puts "<>" * 30
    puts ranks

    if @user.games.length == 0
      user_rank = 0
    else
      user_rank = (Game.where(winning_user_id: @user.id).length).to_f / (@user.games.length).to_f
    end
    puts "user Rank #{user_rank}"
    rank = ranks.index { |i| i == user_rank } + 1
    blue_games = Game.where(blue_user_id: @user.id).length
    red_games = Game.where(red_user_id: @user.id).length
    blue_wins = Game.where(blue_user_id: @user.id, winning_user_id: @user.id).length
    red_wins = Game.where(red_user_id: @user.id, winning_user_id: @user.id).length
    users = User.all.length

    render json: { blue_games: blue_games, red_games: red_games, blue_wins: blue_wins, red_wins: red_wins, rank: rank, users: users }
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def user_params
    params.require(:user).permit(:user_name, :password)
  end
end
